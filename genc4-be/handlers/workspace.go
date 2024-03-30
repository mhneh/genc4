package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	requestDto "gen-c4/dto/request"
	"gen-c4/models/entity"
	"gen-c4/store"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"io"
	"net/http"
)

type WorkspaceHandler struct {
	context        context.Context
	config         *viper.Viper
	workspaceStore store.IWorkspaceStore
}

func NewWorkspaceHandler(context context.Context, config *viper.Viper, workspaceStore store.IWorkspaceStore) *WorkspaceHandler {
	return &WorkspaceHandler{
		context:        context,
		config:         config,
		workspaceStore: workspaceStore,
	}
}

func (handler *WorkspaceHandler) GetAllWorkspaces(context *gin.Context) {
	workspaces, err := handler.workspaceStore.FindAll(handler.context)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	context.JSON(http.StatusOK, workspaces)
}

func (handler *WorkspaceHandler) GetWorkspace(context *gin.Context) {
	var workspaceId = context.Param("id")
	workspace, err := handler.workspaceStore.FindById(handler.context, workspaceId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	if workspace.Name == "" {
		context.JSON(http.StatusNotFound, gin.H{
			"error": "Workspace not found.",
		})
		return
	}
	context.JSON(http.StatusOK, gin.H{
		"initial": workspace,
		"actions": workspace.Actions,
	})
}

func (handler *WorkspaceHandler) CreateWorkspace(context *gin.Context) {
	var request requestDto.CreateWorkspaceRequest
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var workspaceName = "blog-system"
	if len(request.Name) > 0 {
		workspaceName = request.Name
	}
	newWorkspace := &entity.Workspace{
		Name:       workspaceName,
		Diagrams:   request.Initial.Diagrams,
		DiagramIds: request.Initial.DiagramIds,
		Size:       request.Initial.Size,
		Actions:    request.Actions,
	}
	newId, err := handler.workspaceStore.Create(handler.context, newWorkspace)
	if err != nil {
		context.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err,
		})
		return
	}
	context.JSON(http.StatusAccepted, gin.H{
		"readToken":  newId,
		"writeToken": newId,
	})
}

func (handler *WorkspaceHandler) UpdateWorkspace(context *gin.Context) {
	var workspaceId = context.Param("id")
	var request requestDto.UpdateWorkspaceRequest
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	workspace, err := handler.workspaceStore.FindById(handler.context, workspaceId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	if workspace.Name == "" {
		context.JSON(http.StatusNotFound, gin.H{
			"error": "Workspace not found.",
		})
		return
	}
	updatedWorkspace := entity.Workspace{
		Diagrams:   request.Initial.Diagrams,
		DiagramIds: request.Initial.DiagramIds,
		Size:       request.Initial.Size,
		Actions:    request.Actions,
	}
	_, updatedErr := handler.workspaceStore.Update(handler.context, workspaceId, updatedWorkspace)
	if updatedErr != nil {
		context.JSON(http.StatusAccepted, gin.H{
			"message": "Updated failed.",
		})
		return
	}
	context.JSON(http.StatusAccepted, gin.H{
		"message": "Updated success.",
	})
}

func (handler *WorkspaceHandler) DeleteWorkspace(context *gin.Context) {

}

func (handler *WorkspaceHandler) GenerateWorkspace(context *gin.Context) {
	var workspaceId = context.Param("id")

	workspace, err := handler.workspaceStore.FindById(handler.context, workspaceId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	if workspace.Name == "" {
		context.JSON(http.StatusNotFound, gin.H{
			"error": "Workspace not found.",
		})
		return
	}
	var components = make([]requestDto.Component, 0)
	for _, diagram := range workspace.Diagrams {
		if diagram.Type != "Components" {
			continue
		}
		for _, item := range diagram.Items {
			component := requestDto.Component{
				Name:        item.Appearance["TITLE"].(string),
				Description: item.Appearance["DESCRIPTION"].(string),
			}
			components = append(components, component)
		}
	}
	var body = requestDto.GenCodeRequest{
		AppId:      workspace.ID.String(),
		AppName:    workspace.Name,
		Components: components,
	}
	jsonValue, _ := json.Marshal(body)
	response, apiErr := http.Post("http://127.0.0.1:5000/code-gen", "application/json", bytes.NewBuffer(jsonValue))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": apiErr.Error()})
		return
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Code gen server error."})
		return
	}
	bodyBytes, fileErr := io.ReadAll(response.Body)
	if fileErr != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Can't response source after code gen."})
		return
	}
	context.Header("Content-Description", "File Transfer")
	context.Header("Content-Transfer-Encoding", "binary")
	context.Header("Content-Disposition", "attachment; filename="+workspace.Name+".zip")
	context.Data(http.StatusOK, "application/octet-stream", bodyBytes)
}

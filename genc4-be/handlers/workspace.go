package handlers

import (
	"context"
	requestDto "gen-c4/dto/request"
	"gen-c4/models/entity"
	"gen-c4/store"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
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
	newWorkspace := &entity.Workspace{
		Name:       "Default workspace name",
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
	handler.workspaceStore.Update(handler.context, workspaceId, updatedWorkspace)
	context.JSON(http.StatusAccepted, gin.H{
		"message": "Updated success.",
	})
}

func (handler *WorkspaceHandler) DeleteWorkspace(context *gin.Context) {

}

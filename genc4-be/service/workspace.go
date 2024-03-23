package service

import (
	"bytes"
	"gen-c4/dto/request"
	"gen-c4/models/entity"
	"gen-c4/utils"
)

type IWorkspaceService interface {
	NewWorkspace()
}

type WorkspaceService struct {
}

func (w *WorkspaceService) NewWorkspace(request request.CreateWorkspaceRequest) *entity.Workspace {
	var workspaceType = request.WorkspaceType
	var workspaceId = "1"
	var userId = "1"

	var src bytes.Buffer
	src.WriteString("template/")
	src.WriteString(*workspaceType)
	src.WriteString(".c4")

	var dst bytes.Buffer
	dst.WriteString(userId)
	dst.WriteString("/")
	dst.WriteString(workspaceId)

	err := utils.CopyFile(src.String(), dst.String())
	if err != nil {
		return nil
	}
	return nil
}

func (w *WorkspaceService) NewStructurizrDslWorkspace(request request.CreateWorkspaceRequest) {

}

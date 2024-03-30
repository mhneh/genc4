package request

import "gen-c4/models/entity"

type CreateWorkspaceRequest struct {
	Name    string
	Initial entity.Workspace
	Actions []entity.Action
}

package request

import "gen-c4/models/entity"

type CreateWorkspaceRequest struct {
	Initial entity.Workspace
	Actions []entity.Action
}

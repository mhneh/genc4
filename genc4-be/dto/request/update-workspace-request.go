package request

import "gen-c4/models/entity"

type UpdateWorkspaceRequest struct {
	Initial entity.Workspace
	Actions []entity.Action
}

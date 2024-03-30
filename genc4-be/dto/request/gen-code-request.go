package request

type GenCodeRequest struct {
	AppId      string      `json:"appId"`
	AppName    string      `json:"appName"`
	Components []Component `json:"components"`
}

type Component struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

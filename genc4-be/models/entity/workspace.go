package entity

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type Workspace struct {
	ID            primitive.ObjectID `json:"id" bson:"_id"`
	Name          string             `json:"name" bson:"name"`
	System        string             `json:"system" bson:"system"`
	Diagrams      []Diagram          `json:"diagrams" bson:"diagrams"`
	DiagramIds    []string           `json:"diagramIds" bson:"diagramIds"`
	Actions       []Action           `json:"actions" bson:"actions"`
	Size          Size               `json:"size" bson:"size"`
	Relationships []Relationship     `json:"relationships" bson:"relationships"`
	Views         []View             `json:"views" bson:"views"`
	CreatedDate   time.Time          `json:"createdDate" bson:"createdDate"`
}

type Diagram struct {
	Id      string        `json:"id" bson:"id"`
	Name    string        `json:"name" bson:"name"`
	Type    string        `json:"type" bson:"type"`
	Items   []DiagramItem `json:"items" bson:"items"`
	RootIds []string      `json:"rootIds" bson:"rootIds"`
}

type DiagramItem struct {
	Id         string                 `json:"id" bson:"id"`
	Type       string                 `json:"type" bson:"type"`
	Renderer   string                 `json:"renderer" bson:"renderer"`
	Appearance map[string]interface{} `json:"appearance" bson:"appearance"`
	Transform  Transform              `json:"transform" bson:"transform"`
}

type Transform struct {
	X float64 `json:"x" bson:"x"`
	Y float64 `json:"y" bson:"y"`
	W float64 `json:"w" bson:"w"`
	H float64 `json:"h" bson:"h"`
	R float64 `json:"r" bson:"r"`
}

type Action struct {
	Type    string  `json:"type" bson:"type"`
	Payload Payload `json:"payload" bson:"payload"`
}

type Payload struct {
	DiagramId string `json:"diagramId" bson:"diagramId"`
	Timestamp uint64 `json:"timestamp" bson:"timestamp"`
	Id        string `json:"id" bson:"id"`
	Title     string `json:"title" bson:"title"`
	Renderer  string `json:"renderer" bson:"renderer"`
	Type      string `json:"type" bson:"type"`
	Position  Size   `json:"position" bson:"position"`
}

type Size struct {
	X float64 `json:"x" bson:"x"`
	Y float64 `json:"y" bson:"y"`
}

type Relationship struct {
	Source string `json:"source" bson:"source"`
	Target string `json:"target" bson:"target"`
	Id     string `json:"id" bson:"id"`
	Title  string `json:"title" bson:"title"`
}

type View struct {
}

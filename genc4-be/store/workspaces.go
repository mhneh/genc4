package store

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"gen-c4/models/entity"
	"gen-c4/utils"
	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"io/ioutil"
	"log"
	"time"
)

type IWorkspaceStore interface {
	Create(ctx context.Context, workspace *entity.Workspace) (string, error)
	FindAll(ctx context.Context) ([]entity.Workspace, error)
	FindByName(ctx context.Context, tag string) ([]entity.Workspace, error)
	FindById(ctx context.Context, id string) (entity.Workspace, error)
	Update(ctx context.Context, id string, workspace entity.Workspace) (int, error)
	DeleteById(ctx context.Context, id string) (int, error)
}

type WorkspaceStore struct {
	client *mongo.Client
	config *viper.Viper
	source *mongo.Collection
}

func NewWorkspaceClient(client *mongo.Client, cfg *viper.Viper) *WorkspaceStore {
	return &WorkspaceStore{
		client: client,
		config: cfg,
		source: utils.InitDataSource(cfg, client, "mongodb.dbcollections.workspaces"),
	}
}

func (c *WorkspaceStore) Init(ctx context.Context) {
	setupIndexes(ctx, c.source, "name")
	if err := loadWorkspaceStaticData(ctx, c.source); err != nil {
		log.Fatal(fmt.Errorf("could not insert static data: %w\n", err))
	}
}

func (c *WorkspaceStore) Create(ctx context.Context, workspace *entity.Workspace) (string, error) {
	workspace.ID = primitive.NewObjectID()
	workspace.CreatedDate = time.Now()
	_, err := c.source.InsertOne(ctx, workspace)
	if err != nil {
		log.Print(fmt.Errorf("could not add new workspace: %w", err))
		return "", err
	}
	return workspace.ID.Hex(), nil
}

func (c *WorkspaceStore) FindAll(ctx context.Context) ([]entity.Workspace, error) {
	workspaces := make([]entity.Workspace, 0)
	cur, err := c.source.Find(ctx, bson.M{})
	if err != nil {
		log.Print(fmt.Errorf("could not get all workspaces: %w", err))
		return nil, err
	}

	if err = cur.All(ctx, &workspaces); err != nil {
		log.Print(fmt.Errorf("could marshall the workspaces results: %w", err))
		return nil, err
	}

	return workspaces, nil
}

func (c *WorkspaceStore) FindByName(ctx context.Context, name string) ([]entity.Workspace, error) {
	workspaces := make([]entity.Workspace, 0)
	cur, err := c.source.Find(ctx, bson.M{"name": name})
	if err != nil {
		log.Print(fmt.Errorf("could not search workspaces using tag [%s]: %w", name, err))
		return nil, err
	}

	if err := cur.All(ctx, &workspaces); err != nil {
		log.Print(fmt.Errorf("could marshall the workspaces results: %w", err))
		return nil, err
	}

	return workspaces, nil
}

func (c *WorkspaceStore) FindById(ctx context.Context, id string) (entity.Workspace, error) {
	var workspace entity.Workspace
	objID, _ := primitive.ObjectIDFromHex(id)
	res := c.source.FindOne(ctx, bson.M{"_id": objID})
	if res.Err() != nil {
		if errors.Is(res.Err(), mongo.ErrNoDocuments) {
			return workspace, nil
		}
		log.Print(fmt.Errorf("error when finding the book [%s]: %q", id, res.Err()))
		return workspace, res.Err()
	}

	if err := res.Decode(&workspace); err != nil {
		log.Print(fmt.Errorf("error decoding [%s]: %q", id, err))
		return workspace, err
	}
	return workspace, nil
}

func (c *WorkspaceStore) Update(ctx context.Context, id string, workspace entity.Workspace) (int, error) {
	objID, _ := primitive.ObjectIDFromHex(id)
	res, err := c.source.UpdateOne(ctx, bson.M{"_id": objID}, bson.D{{ //nolint:govet
		"$set", bson.D{
			{"diagrams", workspace.Diagrams},     //nolint:govet
			{"diagramIds", workspace.DiagramIds}, //nolint:govet
			{"actions", workspace.Actions},       //nolint:govet
			{"size", workspace.Size},             //nolint:govet
		},
	}})
	if err != nil {
		log.Print(fmt.Errorf("could not update book with id [%s]: %w", id, err))
		return 0, err
	}

	return int(res.ModifiedCount), nil
}

// DeleteBook wrapper to delete a book from the MongoDB collection
func (c *WorkspaceStore) DeleteById(ctx context.Context, id string) (int, error) {
	objID, _ := primitive.ObjectIDFromHex(id)
	res, err := c.source.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		log.Print(fmt.Errorf("error marshalling the Workspace results: %w", err))
		return 0, err
	}

	return int(res.DeletedCount), nil
}

func loadWorkspaceStaticData(ctx context.Context, collection *mongo.Collection) error {
	workspaces := make([]entity.Workspace, 0)

	file, err := ioutil.ReadFile("default_data/workspaces.json")
	if err != nil {
		return err
	}

	if err = json.Unmarshal(file, &workspaces); err != nil {
		return err
	}

	var b []interface{}
	for _, book := range workspaces {
		b = append(b, book)
	}
	result, err := collection.InsertMany(ctx, b)
	if err != nil {
		if mongoErr, ok := err.(mongo.BulkWriteException); ok {
			if len(mongoErr.WriteErrors) > 0 && mongoErr.WriteErrors[0].Code == 11000 {
				return nil
			}
		}
		return err
	}

	log.Printf("Inserted books: %d\n", len(result.InsertedIDs))

	return nil
}

func setupIndexes(ctx context.Context, collection *mongo.Collection, key string) {
	idxOpt := &options.IndexOptions{}
	idxOpt.SetUnique(true)
	mod := mongo.IndexModel{
		Keys: bson.M{
			key: 1, // index in ascending order
		},
		Options: idxOpt,
	}

	ind, err := collection.Indexes().CreateOne(ctx, mod)
	if err != nil {
		log.Fatal(fmt.Errorf("Indexes().CreateOne() ERROR: %w", err))
	} else {
		// BooksHandler call returns string of the index name
		log.Printf("CreateOne() index: %s\n", ind)
	}
}

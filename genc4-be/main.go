package main

import (
	"context"
	"fmt"
	"gen-c4/config"
	"gen-c4/handlers"
	"gen-c4/store"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
)

func main() {
	ctx := context.Background()
	config := config.LoadConfig()

	mongoClient := setupMongoClient(ctx, config)
	workspaceStore := store.NewWorkspaceClient(mongoClient, config)

	router := gin.Default()
	handlers.Setup(ctx, config, router, workspaceStore)
	err := router.Run("localhost:8080")
	if err != nil {
		return
	}
}

func setupMongoClient(context context.Context, config *viper.Viper) *mongo.Client {
	uri := fmt.Sprintf("mongodb://%s:%s@%s/genc4?authSource=admin",
		config.GetString("mongodb.dbuser"),
		config.GetString("mongodb.dbpassword"),
		config.GetString("mongodb.dbhost"))

	client, err := mongo.Connect(context, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(fmt.Errorf("could not connect to databse: %w", err))
	}

	if err = client.Ping(context, readpref.Primary()); err != nil {
		log.Fatal(fmt.Errorf("could not ping databse: %w", err))
	}

	log.Println("Connected to MongoDB")

	return client
}

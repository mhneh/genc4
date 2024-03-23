package utils

import (
	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
)

func InitDataSource(cfg *viper.Viper, client *mongo.Client, colKey string) *mongo.Collection {
	db := cfg.GetString("mongodb.dbname")
	col := cfg.GetString(colKey)
	return client.Database(db).Collection(col)
}

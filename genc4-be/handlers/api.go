package handlers

import (
	"context"
	"gen-c4/store"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func Setup(ctx context.Context, cfg *viper.Viper, router *gin.Engine,
	workspaceStore store.IWorkspaceStore) *gin.Engine {

	workspaceHandler := NewWorkspaceHandler(ctx, cfg, workspaceStore)
	router.Use(CORSMiddleware())
	router.GET("/api/workspaces/:id", workspaceHandler.GetWorkspace)
	router.GET("/api/workspaces/", workspaceHandler.GetAllWorkspaces)
	router.PUT("/api/workspaces/:id", workspaceHandler.UpdateWorkspace)
	router.POST("/api/workspaces/", workspaceHandler.CreateWorkspace)
	router.PATCH("/api/workspaces/:id", workspaceHandler.GenerateWorkspace)

	return router
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, Access-Control-Allow-Origin")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

package entity

import (
	"database/sql"
	"time"
)

type User struct {
	ID          uint         // Standard field for the primary key
	Name        string       // A regular string field
	Email       *string      // A pointer to a string, allowing for null values
	Birthday    *time.Time   // Uses sql.NullString to handle nullable strings
	ActivatedAt sql.NullTime // Uses sql.NullTime for nullable time fields
	CreatedAt   time.Time    // Automatically managed by GORM for creation time
	UpdatedAt   time.Time    // Automatically managed by GORM for update time
}

package users

import (
	"github.com/bkim0128/stock/server/pkg/db"
)

type Users []User

type User db.UserTable

type key string

const UserIDKey key = "userID"

func (u *User) TableName() string {
	return "user_table"
}

package users

import (
	"projects/stock_app/server/pkg/db"
)

type Users []User

type User db.UserTable

func (u *User) TableName() string {
	return "user_table"
}

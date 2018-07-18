package users

import (
	"projects/stock_app/server/pkg/db"
)

type Users []User

type User db.Users

func (u *User) TableName() string {
	return "users"
}

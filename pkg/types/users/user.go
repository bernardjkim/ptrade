package users

import (
	"projects/stock_app/pkg/db"
)

type Users []User

type User db.Users

func (u *User) TableName() string {
	return "users"
}

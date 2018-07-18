package session

import (
	Users "projects/stock_app/pkg/types/users"

	"github.com/go-xorm/xorm"
)

var db *xorm.Engine

type LoginData struct {
	Token string     `json:"token"`
	User  Users.User `json:"user"`
}

func Init(DB *xorm.Engine) {
	db = DB
}

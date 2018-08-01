package session

import (
	Users "github.com/bkim0128/stock/server/pkg/types/users"

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

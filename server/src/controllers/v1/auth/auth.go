package session

import (
	"github.com/go-xorm/xorm"
)

var db *xorm.Engine

// LoginData holds user token and data
// type LoginData struct {
// 	Token string     `json:"token"`
// 	User  Users.User `json:"user"`
// }

// Init function initializes this sessions db connection
func Init(DB *xorm.Engine) {
	db = DB
}

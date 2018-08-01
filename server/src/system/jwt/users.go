package jwt

import (
	"errors"

	"github.com/go-xorm/xorm"

	Users "github.com/bkim0128/stock/server/pkg/types/users"
	ORM "github.com/bkim0128/stock/server/src/system/db"
)

func GetUserFromToken(db *xorm.Engine, tokenVal string) (user Users.User, err error) {
	if tokenVal == "" {
		err = errors.New("No token present.")
		return
	}

	// check if token is valid
	userId, err := IsTokenValid(tokenVal)
	if err != nil {
		err = errors.New("Token is invalid.")
		return
	}

	if userId < 1 {
		err = errors.New("Token missing required data.")
		return
	}

	// check if user exists in db
	user = Users.User{ID: userId}
	err = ORM.FindBy(db, &user)
	if err != nil || user.ID < 1 {
		err = errors.New("User in token does not exist in system.")
		return
	}

	return
}

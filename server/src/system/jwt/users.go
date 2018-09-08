package jwt

import (
	"errors"

	"github.com/go-xorm/xorm"

	Users "github.com/bkim0128/stock/server/pkg/types/users"
	ORM "github.com/bkim0128/stock/server/src/system/db"
)

// GetUserFromToken will get the user that owns the the given jwt token. Returns
// a Users.User and any possible error.
func GetUserFromToken(db *xorm.Engine, tokenVal string) (user Users.User, err error) {

	// Error codes returned by failures to get user from token
	var (
		ErrNullToken    = errors.New("jwt: no token present")
		ErrInvalidToken = errors.New("jwt: token is invalid")
		ErrNullUser     = errors.New("jwt: token assigned to no user")
	)

	if tokenVal == "" {
		err = ErrNullToken
		return
	}

	// check if token is valid
	userID, err := IsTokenValid(tokenVal)
	if err != nil {
		err = ErrInvalidToken
		return
	}

	// check if token is assigned to any user id
	if userID < 1 {
		err = ErrNullUser
		return
	}

	// check if user exists in db
	user = Users.User{ID: userID}
	err = ORM.FindBy(db, &user)
	if err != nil || user.ID < 1 {
		err = ErrNullUser
		return
	}

	return
}

package session

import (
	"log"
	"net/http"

	Users "github.com/bkim0128/stock/server/pkg/types/users"
	ORM "github.com/bkim0128/stock/server/src/system/db"
	Passwords "github.com/bkim0128/stock/server/src/system/passwords"
)

// TODO: which status code should be returned

// SignUp function attempts to create a new user profile.
// Responds with status 200 OK if successfully created new user. Will respond
// with an error code otherwise.
func SignUp(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	firstName := r.FormValue("firstName")
	lastName := r.FormValue("lastName")
	email := r.FormValue("email")
	password := r.FormValue("password")

	// verify that email and password have been provided
	if len(email) < 1 || len(password) < 1 {
		http.Error(w, "Email and password are required.", http.StatusBadRequest)
		return
	}

	// verify that there does not already exist a user with the same email
	user := Users.User{Email: email}
	if err := ORM.FindBy(db, &user); err != nil || user.ID > 0 {
		log.Println(err)
		http.Error(w, "Email is already in use", http.StatusBadRequest)
		return
	}

	// encrypt password
	encryptedPassword, err := Passwords.Encrypt(password)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to encrypt password", http.StatusBadRequest)
		return
	}

	user.First = firstName
	user.Last = lastName
	user.Password = encryptedPassword

	// store new user into database
	if err = ORM.Store(db, &user); err != nil {
		log.Println(err)
		http.Error(w, "Unable to create account", http.StatusBadRequest)
		return
	}
}

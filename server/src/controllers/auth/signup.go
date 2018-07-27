package session

import (
	"log"
	"net/http"
	Users "projects/stock_app/server/pkg/types/users"
	ORM "projects/stock_app/server/src/system/db"
	Passwords "projects/stock_app/server/src/system/passwords"
)

// TODO: which status code should be returned
func SignUp(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	firstName := r.FormValue("firstName")
	lastName := r.FormValue("lastName")
	email := r.FormValue("email")
	password := r.FormValue("password")
	// fmt.Println(r)

	if len(email) < 1 || len(password) < 1 {
		http.Error(w, "Email and password are required.", http.StatusBadRequest)
		return
	}

	user := Users.User{Email: email}
	err := ORM.FindBy(db, &user)
	if err != nil || user.ID > 0 {
		log.Println(err)
		http.Error(w, "Email is already in use", http.StatusBadRequest)
		return
	}

	encryptedPassword, err := Passwords.Encrypt(password)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to encrypt password", http.StatusBadRequest)
		return
	}

	user.First = firstName
	user.Last = lastName
	user.Password = encryptedPassword

	err = ORM.Store(db, &user)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to create account", http.StatusBadRequest)
		return
	}
}

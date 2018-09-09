package session

import (
	"encoding/json"
	"log"
	"net/http"

	Users "github.com/bkim0128/stock/server/pkg/types/users"
	ORM "github.com/bkim0128/stock/server/src/system/db"
	"github.com/bkim0128/stock/server/src/system/jwt"
	Passwords "github.com/bkim0128/stock/server/src/system/passwords"
)

//TODO: status codes

// Login function attempts to authenticate user with given credentials. Responds
// with user an authentication token if successful.
func Login(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	email := r.FormValue("email")
	password := r.FormValue("password")

	// check if both email and password arguments have been provided
	if len(email) < 1 || len(password) < 1 {
		http.Error(w, "Email and password are required.", http.StatusUnauthorized)
		return
	}

	// check if user with matching email exists in database
	user := Users.User{Email: email}
	if err := ORM.FindBy(db, &user); err != nil || user.ID < 1 {
		log.Println(err)
		http.Error(w, "Credentials do not match.", http.StatusUnauthorized)
		return
	}

	// check for valid password
	if !Passwords.IsValid(user.Password, password) {
		http.Error(w, "Credentials do not match.", http.StatusUnauthorized)
		return
	}

	// generate authentication token for user
	token := jwt.GetToken(user.ID)

	// set cookie header
	http.SetCookie(w, &http.Cookie{
		Name:       "api.example.com",
		Value:      token,
		Path:       "/",
		RawExpires: "3600", // one hour expiration time
	})

	// convert packet to JSON
	packet, err := json.Marshal(token)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}

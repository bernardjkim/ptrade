package session

import (
	"fmt"

	Users "github.com/bkim0128/stock/server/pkg/types/users"
	ORM "github.com/bkim0128/stock/server/src/system/db"
	"github.com/bkim0128/stock/server/src/system/jwt"
	Passwords "github.com/bkim0128/stock/server/src/system/passwords"

	"encoding/json"
	"log"
	"net/http"
)

func Login(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	email := r.FormValue("email")
	password := r.FormValue("password")
	// fmt.Println("email: ", email)
	// fmt.Println("password: ", password)
	// fmt.Println(r)

	if len(email) < 1 || len(password) < 1 {
		http.Error(w, "Email and password are required.", http.StatusUnauthorized)
		return
	}

	user := Users.User{Email: email}
	err := ORM.FindBy(db, &user)
	if err != nil || user.ID < 1 {
		log.Println(err)
		http.Error(w, "Credentials do not match.", http.StatusUnauthorized)
		return
	}
	fmt.Println(user)

	if !Passwords.IsValid(user.Password, password) {
		http.Error(w, "Credentials do not match.", http.StatusUnauthorized)
		return
	}

	token := jwt.GetToken(user.ID)
	login := LoginData{User: user, Token: token}

	http.SetCookie(w, &http.Cookie{
		Name:       "api.example.com",
		Value:      token,
		Path:       "/",
		RawExpires: "3600",
	})

	packet, err := json.Marshal(login)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}

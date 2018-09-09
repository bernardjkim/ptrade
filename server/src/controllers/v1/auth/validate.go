package session

// import (
// 	"fmt"

// 	"github.com/bkim0128/stock/server/src/system/jwt"

// 	"encoding/json"
// 	"log"
// 	"net/http"
// )

// // Validate users through session tokens. Respond to client with user data.
// func Validate(w http.ResponseWriter, r *http.Request) {

// 	// check if token is present
// 	tokenVal := r.Header.Get("X-App-Token")
// 	if len(tokenVal) < 1 {
// 		log.Println("Ignoring request. No token present.")
// 		http.Error(w, "Token required for check.", http.StatusUnauthorized)
// 		return
// 	}

// 	user, err := jwt.GetUserFromToken(db, tokenVal)
// 	if err != nil {
// 		log.Println(err)
// 		http.Error(w, err.Error(), http.StatusUnauthorized)
// 		return
// 	}

// 	user.Password = ""

// 	login := LoginData{User: user, Token: tokenVal}

// 	// convert packet to JSON
// 	packet, err := json.Marshal(login)
// 	if err != nil {
// 		log.Println(err)
// 		http.Error(w, "Unable to marshal json.", http.StatusUnauthorized)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(packet)
// }

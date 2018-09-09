package users

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-xorm/xorm"
	"github.com/gorilla/mux"

	Users "github.com/bkim0128/stock/server/pkg/types/users"
	ORM "github.com/bkim0128/stock/server/src/system/db"
)

var db *xorm.Engine

// Init function will initialize this handler's connection to the db
func Init(DB *xorm.Engine) {
	db = DB
}

// GetUsers responds with a list of all users?
func GetUsers(w http.ResponseWriter, r *http.Request) {

}

// GetUser responds with user information
// TODO: return error if no user with give id? or just empty user?
func GetUser(w http.ResponseWriter, r *http.Request) {

	// get user id from url
	userID, err := strconv.ParseInt(mux.Vars(r)["ID"], 10, 64)
	if err != nil {
		log.Println(err)
		http.Error(w, "Provided invalid id", http.StatusBadRequest)
		return
	}

	user := Users.User{ID: userID}

	// find all transactions with given user id
	if err := ORM.FindBy(db, &user); err != nil {
		log.Println(err)
		http.Error(w, "Unable to get transactions from database", http.StatusInternalServerError)
		return
	}

	// remove password field
	user.Password = ""

	// convert packet to JSON
	packet, err := json.Marshal(user)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}

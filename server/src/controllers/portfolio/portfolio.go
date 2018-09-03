package portfolio

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	Portfolios "github.com/bkim0128/stock/server/pkg/types/portfolios"
	ORM "github.com/bkim0128/stock/server/src/system/db"
	"github.com/bkim0128/stock/server/src/system/jwt"

	"github.com/go-xorm/xorm"
)

var db *xorm.Engine

// type PortfolioData struct {
// 	Portfolio Portfolios.Portfolio `json:"portfolio"`
// }

func Init(DB *xorm.Engine) {
	db = DB
}

// GetStocks returns an array of transactions made by a user
func GetStocks(w http.ResponseWriter, r *http.Request) {
	tokenVal := r.Header.Get("X-App-Token")
	fmt.Println(r.Header.Get("Cookie"))
	fmt.Println(tokenVal)

	if len(tokenVal) < 1 {
		log.Println("Ignoring request. No token present.")
		http.Error(w, "Token required for check.", http.StatusUnauthorized)
		return
	}

	// get user from token
	user, err := jwt.GetUserFromToken(db, tokenVal)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	// get all transactions made by user
	var transactionList []Portfolios.Transaction

	err = ORM.Find(db, &Portfolios.Transaction{UserId: user.ID}, &transactionList)
	if err != nil {
		log.Println(err)
		http.Error(w, "unable to get portfolio from database", http.StatusUnauthorized) //TODO: status code
		return
	}

	// packet, err := json.Marshal(portfolio)
	packet, err := json.Marshal(transactionList)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusUnauthorized) // TODO: status code
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}
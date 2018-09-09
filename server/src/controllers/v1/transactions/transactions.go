package transactions

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"

	Stocks "github.com/bkim0128/stock/server/pkg/types/stocks"
	Transactions "github.com/bkim0128/stock/server/pkg/types/transactions"
	Users "github.com/bkim0128/stock/server/pkg/types/users"
	ORM "github.com/bkim0128/stock/server/src/system/db"

	"github.com/go-xorm/xorm"
)

var db *xorm.Engine

// Init function will initialize this handler's connection to the db
func Init(DB *xorm.Engine) {
	db = DB
}

// GetTransactions returns an array of transactions made by a user
func GetTransactions(w http.ResponseWriter, r *http.Request) {

	// TODO: get userid from url parameter

	// type assertion
	userID := r.Context().Value(Users.UserIDKey).(int64)

	// get all transactions made by user
	var transactionList []Transactions.Transaction

	// find all transactions with given user id
	if err := ORM.Find(db, &Transactions.Transaction{UserID: userID}, &transactionList); err != nil {
		log.Println(err)
		http.Error(w, "Unable to get transactions from database", http.StatusUnauthorized) //TODO: status code
		return
	}

	// convert packet to JSON
	packet, err := json.Marshal(transactionList)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusUnauthorized) // TODO: status code
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}

// BuyShares will execute user transactions and update the database with the
// desired transaction.
func BuyShares(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	symbol := r.FormValue("symbol")

	//
	quantity, err := strconv.ParseInt(r.FormValue("quantity"), 10, 64)
	if err != nil {
		log.Println(err)
		http.Error(w, "Invalid quantity value", http.StatusBadRequest)
		return
	}

	// type assertion
	user := r.Context().Value(Users.UserIDKey).(Users.User)

	// verify valid stock symbol
	stock := Stocks.Stock{Symbol: symbol}
	if err = ORM.FindBy(db, &stock); err != nil || user.ID < 1 {
		log.Println(err)
		http.Error(w, "Stock symbol not found", http.StatusNoContent) // TODO: status code
		return
	}

	// TODO:
	// - what time and value is stored?
	// - clean up

	timeStamp := time.Now()
	fmt.Println("Time Stamp: ", timeStamp)

	// get current price for a share
	resp, err := http.Get("https://api.iextrading.com/1.0/stock/" + symbol + "/price")
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to retrieve stock price", http.StatusNoContent) // TODO: status code
		return
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error reading body", http.StatusNoContent) // TODO: status code
		return
	}

	price, err := strconv.ParseFloat(string(body), 64)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error getting price", http.StatusBadRequest)
		return
	}

	transaction := Transactions.Transaction{
		UserID:   user.ID,
		StockID:  stock.ID,
		Date:     timeStamp,
		Price:    price,
		Quantity: quantity,
	}

	// store new transaction into database
	if err = ORM.Store(db, &transaction); err != nil {
		log.Println(err)
		http.Error(w, "Unable to make transaction", http.StatusBadRequest) //TODO: status code
		return
	}

}

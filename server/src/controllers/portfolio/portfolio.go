package portfolio

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"

	Portfolios "github.com/bkim0128/stock/server/pkg/types/portfolios"
	Stocks "github.com/bkim0128/stock/server/pkg/types/stocks"
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
	// fmt.Println(tokenVal)

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

	err = ORM.Find(db, &Portfolios.Transaction{UserID: user.ID}, &transactionList)
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

func BuyShares(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	tokenVal := r.Header.Get("X-App-Token")
	// fmt.Println(tokenVal)

	symbol := r.FormValue("symbol")

	quantity, err := strconv.ParseInt(r.FormValue("quantity"), 10, 64)
	if err != nil {
		log.Println(err)
		http.Error(w, "Invalid quantity value", http.StatusBadRequest)
		return
	}

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

	// get stock from symbol
	stock := Stocks.Stock{Symbol: symbol}
	err = ORM.FindBy(db, &stock)
	if err != nil || user.ID < 1 {
		log.Println(err)
		http.Error(w, "Stock symbol not found", http.StatusNoContent) // TODO: status code
		return
	}

	// TODO:
	// - what time and value is stored?
	// - clean up

	timeStamp := time.Now()
	fmt.Println("Time Stamp: ", timeStamp)

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

	fmt.Println("Current Share Price: ", price)

	transaction := Portfolios.Transaction{
		UserID:   user.ID,
		StockID:  stock.ID,
		Date:     timeStamp,
		Price:    price,
		Quantity: quantity,
	}

	err = ORM.Store(db, &transaction)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to make transaction", http.StatusBadRequest) //TODO: status code
		return
	}

}

func SellShares(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()

	tokenVal := r.Header.Get("X-App-Token")
	// fmt.Println(tokenVal)

	symbol := r.FormValue("symbol")

	quantity, err := strconv.ParseInt(r.FormValue("quantity"), 10, 64)
	if err != nil {
		log.Println(err)
		http.Error(w, "Invalid quantity value", http.StatusBadRequest)
		return
	}

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

	// get stock from symbol
	stock := Stocks.Stock{Symbol: symbol}
	err = ORM.FindBy(db, &stock)
	if err != nil || user.ID < 1 {
		log.Println(err)
		http.Error(w, "Stock symbol not found", http.StatusNoContent) // TODO: status code
		return
	}

	// TODO:
	// - what time and value is stored?
	// - clean up
	// - verify valid sale, check it user owns enough shares

	timeStamp := time.Now()
	fmt.Println("Time Stamp: ", timeStamp)

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

	fmt.Println("Current Share Price: ", price)

	transaction := Portfolios.Transaction{
		UserID:   user.ID,
		StockID:  stock.ID,
		Date:     timeStamp,
		Price:    price,
		Quantity: quantity,
	}

	err = ORM.Store(db, &transaction)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to make transaction", http.StatusBadRequest) //TODO: status code
		return
	}

}

package stocks

import (
	"encoding/json"
	"log"
	"net/http"

	Stocks "github.com/bkim0128/stock/server/pkg/types/stocks"
	ORM "github.com/bkim0128/stock/server/src/system/db"

	"github.com/go-xorm/xorm"
)

var db *xorm.Engine

// Init function initializes db connection
func Init(DB *xorm.Engine) {
	db = DB
}

// GetStocks function will return a list of available stock data containing
// id, symbol, and company name.
func GetStocks(w http.ResponseWriter, r *http.Request) {

	var stockList Stocks.StockList

	// get list of available stocks from database
	if err := ORM.Find(db, &Stocks.Stock{}, &stockList); err != nil {
		log.Println(err)
		http.Error(w, "unable to get stock list", http.StatusNotFound) //TODO: status code
		return
	}

	// convert packet to JSON
	packet, err := json.Marshal(stockList)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusNotFound) // TODO: status code
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}

package stock

import (
	"encoding/json"
	"log"
	"net/http"

	Stocks "github.com/bkim0128/stock/server/pkg/types/stocks"
	ORM "github.com/bkim0128/stock/server/src/system/db"

	"github.com/go-xorm/xorm"
)

var db *xorm.Engine

func Init(DB *xorm.Engine) {
	db = DB
}

func GetStockList(w http.ResponseWriter, r *http.Request) {

	var stockList Stocks.StockList

	err := ORM.Find(db, &Stocks.Stock{}, &stockList)
	if err != nil {
		log.Println(err)
		http.Error(w, "unable to get stock list", http.StatusNotFound) //TODO: status code
		return
	}

	packet, err := json.Marshal(stockList)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusNotFound) // TODO: status code
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}

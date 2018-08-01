package stock

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	StockDatum "projects/stock_app/server/pkg/types/stock_data"
	ORM "projects/stock_app/server/src/system/db"

	"github.com/go-xorm/xorm"
)

type HistoryData struct {
	StockDatum []StockDatum.StockData `json:"stockdata"`
}

var db *xorm.Engine

// Init - initialize stock controller
func Init(DB *xorm.Engine) {
	db = DB
}

// GetHistory - handle requests to get stock history
func GetHistory(w http.ResponseWriter, r *http.Request) {
	fmt.Println("get history")
	r.ParseForm()

	symbol := r.FormValue("symbol")
	fmt.Println(symbol)

	if len(symbol) < 1 {
		http.Error(w, "Symbol is required", http.StatusBadRequest)
		return
	}

	stockDatum := StockDatum.StockDatum{}

	// stockData := StockDatum.StockData{Symbol: symbol}

	err := ORM.Find(db, &StockDatum.StockData{Symbol: symbol}, &stockDatum)
	if err != nil {
		http.Error(w, "Unable to find symbol data", http.StatusBadRequest)
		return
	}
	// fmt.Println(stockDatum)

	history := HistoryData{StockDatum: stockDatum}
	packet, err := json.Marshal(history)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)

}

package main

import (
	"html/template"
	"net/http"

	"gitlab.cs.washington.edu/kimb0128/stock_app/stock"
)

// StockData asdf
type StockData struct {
	Date  string
	Open  float64
	Close float64
}

func serveFile(w http.ResponseWriter, r *http.Request) {
	var sd []StockData

	symbol := "AAPL"
	db, _ := stock.NewSQLDB()
	data, _ := db.GetHistory(symbol)

	for _, d := range data {
		sd = append(sd, StockData{Date: d.Date, Open: d.Open, Close: d.Close})
	}
	tmpl := template.Must(template.ParseFiles("layout.html"))

	tmpl.Execute(w, sd)

}

func main() {

	http.HandleFunc("/", serveFile)
	http.ListenAndServe(":8080", nil)

}

package main

import (
	"fmt"
	"go/build"
	"html/template"
	"net/http"

	"gitlab.cs.washington.edu/kimb0128/stock_app/stock"
)

// Data asdf
type Data struct {
	Date  string
	Open  float64
	Close float64
}

// Stock asdf
type Stock struct {
	Symbol string
	SD     []Data
}

func serveFile(w http.ResponseWriter, r *http.Request) {
	var sd []Data

	symbol := "AAPL"
	db, _ := stock.NewSQLDB()
	data, _ := db.GetHistory(symbol)

	for _, d := range data {
		sd = append(sd, Data{Date: d.Date, Open: d.Open, Close: d.Close})
	}
	tmpl := template.Must(template.ParseFiles("server/layout.html"))

	s := Stock{Symbol: symbol, SD: sd}
	err := tmpl.Execute(w, s)
	if err != nil {
		fmt.Println(err)
	}

}

func main() {
	gopath := build.Default.GOPATH + "src/gitlab.cs.washington.edu/kimb0128/stock_app"
	fmt.Println(gopath)

	http.HandleFunc("/", serveFile)
	http.ListenAndServe(":8080", nil)

}

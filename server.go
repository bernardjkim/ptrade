package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	_ "github.com/mattn/go-sqlite3"
	"gitlab.cs.washington.edu/kimb0128/stock_app/models"
	"gitlab.cs.washington.edu/kimb0128/stock_app/utils"
)

// Data asdf
type Data struct {
	Date  string
	Open  float64
	Close float64
}

// Stock asdf
type Stock struct {
	Symbol  string
	Current Data
	SD      []Data
}

// RequestHandler asdf
type RequestHandler struct {
	db models.SDB
}

func (h *RequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	r.ParseForm()
	fmt.Println("method: ", r.Method)
	fmt.Println("symbol: ", r.FormValue("symbol"))

	if r.Method == "POST" {
		// Requested Symbol
		symbol := strings.ToUpper(r.FormValue("symbol"))
		data, err := h.db.GetHistory(symbol)

		if err != nil {

			// TODO: Redirect to error page
			// tmpl := template.Must(template.ParseFiles("server/error.html"))
			fmt.Println(err)
			tmpl := utils.LoadTemplates("./templates/index.html")
			utils.ExecuteTemplate(w, tmpl, nil)
		} else {

			// Parse data
			var sd []Data
			for _, d := range data {
				sd = append(sd, Data{Date: d.Date, Open: d.Open, Close: d.Close})
			}

			// Data to be used for template
			s := Stock{Symbol: symbol, Current: sd[len(sd)-1], SD: sd}

			// Load & Execute template
			tmpl := utils.LoadTemplates("./templates/layout.html")
			utils.ExecuteTemplate(w, tmpl, s)
		}
	} else {
		tmpl := utils.LoadTemplates("./templates/index.html")
		utils.ExecuteTemplate(w, tmpl, nil)
	}

}

func homeHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := utils.LoadTemplates("./templates/index.html")
	utils.ExecuteTemplate(w, tmpl, nil)
}

func main() {
	// gopath := build.Default.GOPATH + "src/gitlab.cs.washington.edu/kimb0128/stock_app"
	// fmt.Println(gopath)

	// Open database connection
	db, err := models.NewSQLDB()
	if err != nil {
		log.Fatal(err)
	}

	//
	mux := http.NewServeMux()

	// Register handler
	mux.HandleFunc("/", homeHandler)
	mux.Handle("/view", &RequestHandler{db: db})
	http.ListenAndServe(":8080", mux)

}

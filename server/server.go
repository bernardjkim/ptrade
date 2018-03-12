package main

import (
	"fmt"
	"net/http"
	"strings"

	"gitlab.cs.washington.edu/kimb0128/stock_app/stock"
)

func sayHello(w http.ResponseWriter, r *http.Request) {
	message := r.URL.Path
	message = strings.TrimPrefix(message, "/")
	message = "Hello " + message

	w.Write([]byte(message))
}

func main() {
	// http.HandleFunc("/", sayHello)
	// if err := http.ListenAndServe(":8080", nil); err != nil {
	// 	panic(err)
	// }

	fmt.Println("Hello, World")
	symbolList := stock.GetSymbols()
	for _, symbol := range symbolList {
		fmt.Printf("%s\n", symbol)
	}

	fmt.Printf("%t\n", stock.IsValidSymbol("AAPL"))
	fmt.Printf("%t\n", stock.IsValidSymbol("TEST"))

	fmt.Printf("%f\n", stock.GetCurrentValue("AAPL"))
	fmt.Printf("%f\n", stock.GetCurrentValue("TEST"))

	hist := stock.GetHistory("AAPL")

	for _, val := range hist {
		fmt.Printf("%f\n", val)
	}

}

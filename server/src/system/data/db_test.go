package data

import (
	"fmt"
	"testing"
)

func TestGetSymbols(t *testing.T) {

	db, err := NewSQLDB()
	if err != nil {
		fmt.Println(err)
	}

	symbols, err := db.GetSymbols()
	if err != nil {
		fmt.Println(err)
	}

	for _, s := range symbols {
		fmt.Println(s.Symbol)
	}

	db.Close()
}

func TestIsValid(t *testing.T) {
	//func ExampleIsValid() {

	db, err := NewSQLDB()
	if err != nil {
		fmt.Println(err)
	}

	symbol1 := "AAPL"
	symbol2 := "aapl"
	symbol3 := "FALSETEST"

	valid1, err := db.IsValidSymbol(symbol1)
	valid2, err := db.IsValidSymbol(symbol2)
	valid3, err := db.IsValidSymbol(symbol3)

	fmt.Println(symbol1, valid1)
	fmt.Println(symbol2, valid2)
	fmt.Println(symbol3, valid3)

	db.Close()
	// Output:
	// AAPL true
	// aapl true
	// FALSETEST false

}

func TestCurrentValue(t *testing.T) {

	db, err := NewSQLDB()

	symbol := "AAPL"

	val, err := db.CurrentValue(symbol)
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println("Open:\t", val.Open)
	fmt.Println("Close :\t", val.Close)

	db.Close()

}

func TestGetHistory(t *testing.T) {
	db, _ := NewSQLDB()
	symbol := "AAPL"
	data, _ := db.GetHistory(symbol)

	for _, d := range data {
		fmt.Println("Open:\t", d.Open)
		fmt.Println("Close:\t", d.Close)
	}
}

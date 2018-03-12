package stock

import (
	// "fmt"
	"database/sql"
	"log"
	// should not be using sqlite3 driver packages directly
	_ "github.com/mattn/go-sqlite3"
)

// GetSymbols returns a list of symbols
func GetSymbols() []string {
	var symbolList []string
	var symbol string

	db, err := sql.Open("sqlite3", "../stock/stocks.db")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("select symbol from symbols where isEnabled == 1")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&symbol)
		if err != nil {
			log.Fatal(err)
		}
		symbolList = append(symbolList, symbol)
	}

	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	db.Ping()

	return symbolList
}

// IsValidSymbol returns true if symbol is a valid symbol
func IsValidSymbol(symbol string) bool {
	var result string
	db, err := sql.Open("sqlite3", "../stock/stocks.db")
	if err != nil {
		log.Fatal(err)
	}

	err = db.QueryRow("SELECT symbol FROM symbols WHERE symbol = ?", symbol).Scan(&result)
	if err != nil {
		if err == sql.ErrNoRows {
			return false
		}
		log.Fatal(err)
	}
	return result == symbol
}

// GetCurrentValue returns the latest close value of symbol
func GetCurrentValue(symbol string) float64 {
	var result float64

	if !IsValidSymbol(symbol) {
		return float64(0)
	}

	db, err := sql.Open("sqlite3", "../stock/stocks.db")
	if err != nil {
		log.Fatal(err)
	}

	err = db.QueryRow("SELECT close FROM stock_data WHERE symbol = ? order by date limit 1", symbol).Scan(&result)
	if err != nil {
		if err == sql.ErrNoRows {
			return float64(0)
		}
		log.Fatal(err)
	}

	return result
}

// GetHistory returns entire close value history for symbol
func GetHistory(symbol string) []float64 {
	var result []float64
	var close float64

	if !IsValidSymbol(symbol) {
		return result
	}

	db, err := sql.Open("sqlite3", "../stock/stocks.db")
	if err != nil {
		log.Fatal(err)
	}

	rows, err := db.Query("SELECT close FROM stock_data WHERE symbol == ?", symbol)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&close)
		if err != nil {
			log.Fatal(err)
		}
		result = append(result, close)
	}

	return result
}

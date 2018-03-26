package models

import (
	"database/sql"
	"fmt"
	"strings"
	// should not be using sqlite3 driver packages directly
	_ "github.com/mattn/go-sqlite3"
)

// SDB provides access to stock database
type SDB interface {
	GetSymbols() ([]*Symbol, error)
	IsValidSymbol(string) (bool, error)
	CurrentValue(string) (*Data, error)
	GetHistory(string) ([]*Data, error)
	Close()
}

type sqlDB struct {
	conn *sql.DB

	getSymbols   *sql.Stmt
	isValid      *sql.Stmt
	currentValue *sql.Stmt
	getHistory   *sql.Stmt
}

var _ SDB = &sqlDB{}

// Symbol holds metadata about a symbol
type Symbol struct {
	Symbol    string
	Name      string
	Date      string
	IsEnabled bool
	Type      string
	IexID     int64
}

// Data hold stock data
type Data struct {
	Symbol string
	Date   string
	Open   float64
	Close  float64
}

// sql prepared statements
const getSymbolsStmt = `SELECT * FROM symbols WHERE isEnabled == 1`
const isValidStmt = `SELECT * FROM symbols WHERE symbol = ?`
const currentValueStmt = `SELECT * FROM stock_data WHERE symbol = ? order by date limit 1`
const getHistoryStmt = `SELECT * FROM stock_data WHERE symbol == ?`

// NewSQLDB initializes and returns a SDB
func NewSQLDB() (SDB, error) {

	dbString := "/Users/bernard/go/src/gitlab.cs.washington.edu/kimb0128/stock_app/models/stocks.db"
	conn, err := sql.Open("sqlite3", dbString)
	if err != nil {
		return nil, fmt.Errorf("sqlite3: could not get a connection: %v", err)
	}
	if err := conn.Ping(); err != nil {
		conn.Close()
		return nil, fmt.Errorf("sqlite3: could not establish a good connection: %v", err)
	}

	db := &sqlDB{
		conn: conn,
	}

	if db.getSymbols, err = conn.Prepare(getSymbolsStmt); err != nil {
		return nil, fmt.Errorf("sqlite3: prepare getSymbols: %v", err)
	}

	if db.isValid, err = conn.Prepare(isValidStmt); err != nil {
		return nil, fmt.Errorf("sqlite3: prepare isValid: %v", err)
	}

	if db.currentValue, err = conn.Prepare(currentValueStmt); err != nil {
		return nil, fmt.Errorf("sqlite3: prepare currentValue: %v", err)
	}

	if db.getHistory, err = conn.Prepare(getHistoryStmt); err != nil {
		return nil, fmt.Errorf("sqlite3: prepare getHistory: %v", err)
	}

	return db, nil
}

// Close closes the database, freeing up any resources.
func (db *sqlDB) Close() {
	db.conn.Close()
}

// rowScanner is implemented by sql.Row and sql.Rows
type rowScanner interface {
	Scan(dest ...interface{}) error
}

func scanSymbol(s rowScanner) (*Symbol, error) {
	var (
		symbol    string
		name      string
		date      string
		isEnabled bool
		symType   string
		iexID     int64
	)
	if err := s.Scan(&symbol, &name, &date, &isEnabled, &symType, &iexID); err != nil {
		return nil, err
	}

	result := &Symbol{
		Symbol:    symbol,
		Name:      name,
		Date:      date,
		IsEnabled: isEnabled,
		Type:      symType,
		IexID:     iexID,
	}

	return result, nil
}

func scanData(s rowScanner) (*Data, error) {
	var (
		symbol string
		date   string
		open   float64
		close  float64
	)
	if err := s.Scan(&symbol, &date, &open, &close); err != nil {
		return nil, err
	}

	result := &Data{
		Symbol: symbol,
		Date:   date,
		Open:   open,
		Close:  close,
	}

	return result, nil
}

// GetSymbols returns a list of symbols
func (db *sqlDB) GetSymbols() ([]*Symbol, error) {
	var symbolList []*Symbol

	rows, err := db.getSymbols.Query()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		symbol, err := scanSymbol(rows)
		if err != nil {
			return nil, fmt.Errorf("sqlite3: could not read row: %v", err)
		}
		symbolList = append(symbolList, symbol)
	}

	return symbolList, nil
}

// IsValidSymbol returns true if symbol is a valid symbol
func (db *sqlDB) IsValidSymbol(symbol string) (bool, error) {
	symbol = strings.ToUpper(symbol)
	row := db.isValid.QueryRow(symbol)

	_, err := scanSymbol(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, fmt.Errorf("sqlite3: no stock with symbol: %s", symbol)
		}
		return false, fmt.Errorf("sqlite3: could not read row: %v", err)
	}

	return true, nil
}

// GetCurrentValue returns the latest close value of symbol
func (db *sqlDB) CurrentValue(symbol string) (*Data, error) {
	symbol = strings.ToUpper(symbol)
	if _, err := db.IsValidSymbol(symbol); err != nil {
		return nil, err
	}

	row := db.currentValue.QueryRow(symbol)

	data, err := scanData(row)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("sqlite3: no stock with symbol: %s", symbol)
		}
		return nil, err
	}

	return data, nil
}

// GetHistory returns entire close value history for symbol
func (db *sqlDB) GetHistory(symbol string) ([]*Data, error) {
	symbol = strings.ToUpper(symbol)
	var results []*Data

	if _, err := db.IsValidSymbol(symbol); err != nil {
		return nil, err
	}

	rows, err := db.getHistory.Query(symbol)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		data, err := scanData(rows)
		if err != nil {
			return nil, fmt.Errorf("sqlite3: could not read row: %v", err)
		}
		results = append(results, data)
	}

	return results, nil
}

package db

import (
	"time"
)

type Migrations struct {
	Id    int64     `xorm:"'id' pk autoincr" json:"id" schema:"id"`
	Name  string    `xorm:"name" json:"name" schema:"name"`
	RunOn time.Time `xorm:"run_on" json:"run_on" schema:"run_on"`
}

// UserTable represents a user stored in the database
type UserTable struct {
	ID       int64  `xorm:"ID" json:"ID" schema:"ID"`
	First    string `xorm:"first" json:"first" schema:"first"`
	Last     string `xorm:"last" json:"last" schema:"last"`
	Email    string `xorm:"email" json:"email" schema:"email"`
	Password string `xorm:"password" json:"password" schema:"password"`
}

// StockTable represents a stock that is available in the database
type StockTable struct {
	Id     int64  `xorm:"id" json:"id" schema:"id"`
	Symbol string `xorm:"symbol" json:"symbol" schema:"symbol"`
	Name   string `xorm:"name" json:"name" schema:"name"`
}

// TransactionTable represents a transaction made by a user
type TransactionTable struct {
	UserId   int64     `xorm:"user_id" json:"user_id" schema:"user_id"`
	StockId  int64     `xorm:"stock_id" json:"stock_id" schema:"stock_id"`
	Date     time.Time `xorm:"date" json:"date" schema:"date"`
	Price    float64   `xorm:"price" json:"price" schema:"price"`
	Quantity int64     `xorm:"quantity" json:"quantity" schema:"quantity"`
}

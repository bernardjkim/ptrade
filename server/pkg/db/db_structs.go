package db

import (
	"time"
)

type Migrations struct {
	Id    int64     `xorm:"'id' pk autoincr" json:"id" schema:"id"`
	Name  string    `xorm:"name" json:"name" schema:"name"`
	RunOn time.Time `xorm:"run_on" json:"run_on" schema:"run_on"`
}

type PortfolioTable struct {
	UserId      int64 `xorm:"user_id" json:"user_id" schema:"user_id"`
	PortfolioId int64 `xorm:"portfolio_id" json:"portfolio_id" schema:"portfolio_id"`
}

type UserTable struct {
	ID       int64  `xorm:"ID" json:"ID" schema:"ID"`
	First    string `xorm:"first" json:"first" schema:"first"`
	Last     string `xorm:"last" json:"last" schema:"last"`
	Email    string `xorm:"email" json:"email" schema:"email"`
	Password string `xorm:"password" json:"password" schema:"password"`
}

type UserStockTable struct {
	UserId   int64  `xorm:"user_id" json:"user_id" schema:"user_id"`
	Symbol   string `xorm:"symbol" json:"symbol" schema:"symbol"`
	Quantity int64  `xorm:"quantity" json:"quantity" schema:"quantity"`
}

package portfolios

import (
	"github.com/bkim0128/stock/server/pkg/db"
)

type Portfolio []Stock

type Stock db.UserStockTable

func (s *Stock) TableName() string {
	return "user_stock_table"
}

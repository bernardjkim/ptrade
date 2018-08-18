package portfolios

import (
	"github.com/bkim0128/stock/server/pkg/db"
)

type Portfolios []Portfolio

type Portfolio db.UserStockTable

func (p *Portfolio) TableName() string {
	return "user_stock_table"
}

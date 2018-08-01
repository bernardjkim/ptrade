package stockdatum

import (
	"github.com/bkim0128/stock/server/pkg/db"
)

type StockDatum []StockData

type StockData db.StockDataTable

func (u *StockData) TableName() string {
	return "stock_data_table"
}

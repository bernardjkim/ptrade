package stockdatum

import (
	"projects/stock_app/server/pkg/db"
)

type StockDatum []StockData

type StockData db.StockDataTable

func (u *StockData) TableName() string {
	return "stock_data_table"
}

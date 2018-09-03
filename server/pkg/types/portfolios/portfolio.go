package portfolios

import (
	"github.com/bkim0128/stock/server/pkg/db"
)

// type Portfolio []Transaction

type Transaction db.TransactionTable

func (t *Transaction) TableName() string {
	return "transaction_table"
}

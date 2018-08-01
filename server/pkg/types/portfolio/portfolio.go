package portfoilo

import (
	"github.com/bkim0128/stock/server/pkg/db"
)

type Portfolios []Portfolio

type Portfolio db.PortfolioTable

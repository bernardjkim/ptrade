package router

import (
	"net/http"

	"github.com/bkim0128/stock/server/pkg/types/routes"

	AuthHandler "github.com/bkim0128/stock/server/src/controllers/auth"
	// HomeHandler "github.com/bkim0128/stock/server/src/controllers/home"
	PortfolioHandler "github.com/bkim0128/stock/server/src/controllers/portfolio"
	StockHandler "github.com/bkim0128/stock/server/src/controllers/stock"

	"github.com/go-xorm/xorm"
)

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
	})
}

func GetRoutes(db *xorm.Engine) routes.Routes {
	AuthHandler.Init(db)
	// HomeHandler.Init(db)
	PortfolioHandler.Init(db)
	StockHandler.Init(db)

	return routes.Routes{
		// routes.Route{"Home", "GET", "/", HomeHandler.Index},
		routes.Route{"AuthStore", "POST", "/auth/login", AuthHandler.Login},
		routes.Route{"AuthCheck", "GET", "/auth/check", AuthHandler.Check},
		routes.Route{"AuthSignout", "POST", "/auth/signup", AuthHandler.SignUp},
		routes.Route{"PortfolioStocks", "GET", "/portfolio/stocks", PortfolioHandler.GetStocks},
		routes.Route{"PortfolioStocks", "POST", "/portfolio/buy-shares", PortfolioHandler.BuyShares},
		routes.Route{"StockList", "GET", "/stock/list", StockHandler.GetStockList},
	}
}

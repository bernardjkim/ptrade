package router

import (
	"net/http"

	"projects/stock_app/server/pkg/types/routes"

	AuthHandler "projects/stock_app/server/src/controllers/auth"
	HomeHandler "projects/stock_app/server/src/controllers/home"

	"github.com/go-xorm/xorm"
)

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
	})
}

func GetRoutes(db *xorm.Engine) routes.Routes {
	AuthHandler.Init(db)
	HomeHandler.Init(db)

	return routes.Routes{
		routes.Route{"Home", "GET", "/", HomeHandler.Index},
		routes.Route{"AuthStore", "POST", "/auth/login", AuthHandler.Login},
		routes.Route{"AuthCheck", "GET", "/auth/check", AuthHandler.Check},
		routes.Route{"AuthSignout", "GET", "/auth/signout", AuthHandler.Signout},
	}
}

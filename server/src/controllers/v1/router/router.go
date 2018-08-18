package router

// import (
// 	"net/http"

// 	"github.com/bkim0128/stock/server/pkg/types/routes"
// 	StatusHandler "github.com/bkim0128/stock/server/src/controllers/v1/status"

// 	"github.com/go-xorm/xorm"
// )

// var db *xorm.Engine

// func Middleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		next.ServeHTTP(w, r)
// 	})
// }

// func GetRoutes(DB *xorm.Engine) (SubRoute map[string]routes.SubRoutePackage) {
// 	db = DB

// 	StatusHandler.Init(DB)
// 	/* ROUTES */
// 	SubRoute = map[string]routes.SubRoutePackage{
// 		"/v1": routes.SubRoutePackage{
// 			Routes: routes.Routes{
// 				routes.Route{"Status", "GET", "/status", StatusHandler.Index},
// 			},
// 			Middleware: Middleware,
// 		},
// 	}
// 	return
// }

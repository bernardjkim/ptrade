package router

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/go-xorm/xorm"

	"github.com/bkim0128/stock/server/pkg/types/routes"

	Users "github.com/bkim0128/stock/server/pkg/types/users"
	AuthHandler "github.com/bkim0128/stock/server/src/controllers/v1/auth"
	StockHandler "github.com/bkim0128/stock/server/src/controllers/v1/stocks"
	TransactionHandler "github.com/bkim0128/stock/server/src/controllers/v1/transactions"
	"github.com/bkim0128/stock/server/src/system/jwt"
)

var db *xorm.Engine

// Middleware for subrouter. Currently just calls the next handler.
func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		next.ServeHTTP(w, r)
	})
}

// LoggingMiddleware logs all requests received by router
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// TODO: what to log?
		// Dont want to log certain requests that may hold sesitive information
		bodyBytes, _ := ioutil.ReadAll(r.Body)
		r.Body.Close() //  must close
		r.Body = ioutil.NopCloser(bytes.NewBuffer(bodyBytes))
		bodyString := string(bodyBytes)
		log.Println(bodyString)

		next.ServeHTTP(w, r)
	})
}

// AuthMiddleware handles authentication of requests received by router
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("Auth Middleware")
		fmt.Println(r.URL)

		// check if token is present
		tokenVal := r.Header.Get("X-App-Token")
		if len(tokenVal) < 1 {
			log.Println("Ignoring request. No token present.")
			http.Error(w, "No token provided for validation.", http.StatusUnauthorized) //TODO: status code
			return
		}

		// get owner of token
		user, err := jwt.GetUserFromToken(db, tokenVal)
		if err != nil {
			log.Println(err)
			http.Error(w, err.Error(), http.StatusUnauthorized) //TODO: status code
			return
		}

		// pass on user id to next handler
		ctx := context.WithValue(r.Context(), Users.UserIDKey, user.ID)

		// Pass down the request to the next middleware (or final handler)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// GetRoutes returns mappings from names to subroute packages.
func GetRoutes(DB *xorm.Engine) (SubRoute map[string]routes.SubRoutePackage) {
	db = DB

	AuthHandler.Init(DB)
	TransactionHandler.Init(DB)
	StockHandler.Init(DB)

	/* ROUTES */

	// TODO: nested subrouters
	// how to add a subroute to the subroute?

	// Warning: Composite literal uses unkeyed fields.
	// Can remove warnings by including field names (field: value).
	SubRoute = map[string]routes.SubRoutePackage{
		"/v1/auth": routes.SubRoutePackage{
			Routes: routes.Routes{
				routes.Route{"AuthLogin", "POST", "/login", AuthHandler.Login},
				routes.Route{"AuthLogout", "POST", "/logout", NotImplemented}, // TODO: implement logout function
				routes.Route{"AuthSignup", "POST", "/signup", AuthHandler.SignUp},
			},
			Middleware: []mux.MiddlewareFunc{LoggingMiddleware},
		},
		"/v1/stocks": routes.SubRoutePackage{
			Routes: routes.Routes{
				routes.Route{"StockData", "GET", "/", StockHandler.GetStocks},
			},
			Middleware: []mux.MiddlewareFunc{LoggingMiddleware},
		},
		"/v1/users": routes.SubRoutePackage{
			Routes: routes.Routes{

				routes.Route{"UserInfo", "GET", "/{id:[0-9]+}", NotImplemented},

				// TODO: for have users GET/POST transactions directly.
				// maybe want to have user create orders first

				routes.Route{"UserTransactions", "GET", "/{id:[0-9]+}/transactions", TransactionHandler.GetTransactions},

				// TODO: how to add url parameter
				// ex. /transaction/txn/{txn-id}
				routes.Route{"UserTransactions", "GET", "/{id:[0-9]+}/transaction/txn", NotImplemented},
				routes.Route{"UserTransactions", "POST", "/{id:[0-9]+}/transaction/txn", NotImplemented},
			},
			Middleware: []mux.MiddlewareFunc{LoggingMiddleware, AuthMiddleware},
		},
	}
	return
}

// NotImplemented handler is used for API endpoints not yet implemented and will
// return the message "Not Implemented".
var NotImplemented = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Not Implemented"))
})

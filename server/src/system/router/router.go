package router

import (
	"github.com/bkim0128/stock/server/pkg/types/routes"
	V1SubRoutes "github.com/bkim0128/stock/server/src/controllers/v1/router"

	"github.com/go-xorm/xorm"
	"github.com/gorilla/mux"
)

// Router is a wrapper for a mux router.
type Router struct {
	Router *mux.Router
}

// Init will initialize this router's routes and database connection.
func (r *Router) Init(db *xorm.Engine) {
	r.Router.Use(Middleware)

	// TODO: do some routes need to be part of the base routes?

	// baseRoutes := GetRoutes(db)
	// for _, route := range baseRoutes {
	// 	r.Router.
	// 		Methods(route.Method).
	// 		Path(route.Pattern).
	// 		Name(route.Name).
	// 		Handler(route.HandlerFunc)
	// }

	v1SubRoutes := V1SubRoutes.GetRoutes(db)
	for name, pack := range v1SubRoutes {
		r.AttachSubRouterWithMiddleware(name, pack.Routes, pack.Middleware)
	}
}

// AttachSubRouterWithMiddleware will attach the subrouter to the given path
// using the given middleware function
func (r *Router) AttachSubRouterWithMiddleware(path string, subroutes routes.Routes, middleware []mux.MiddlewareFunc) (SubRouter *mux.Router) {

	SubRouter = r.Router.PathPrefix(path).Subrouter()

	// chain middleware functions
	for _, mw := range middleware {
		SubRouter.Use(mw)
	}

	// attach routes to sub router
	for _, route := range subroutes {
		SubRouter.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)

	}
	return
}

// NewRouter simply returns a new Rounter
func NewRouter() (r Router) {
	r.Router = mux.NewRouter().StrictSlash(true)
	return
}

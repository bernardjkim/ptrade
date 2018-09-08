package routes

import "net/http"

// Routes is a list of Routes
type Routes []Route

// Route struct
type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

// type SubRoutePackage struct {
// 	Routes     Routes
// 	Middleware func(new http.Handler) http.Handler
// }

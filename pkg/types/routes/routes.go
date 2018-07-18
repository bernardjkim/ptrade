package routes

import "net/http"

type Routes []Route

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type SubRoutePackage struct {
	Routes     Routes
	Middleware func(new http.Handler) http.Handler
}

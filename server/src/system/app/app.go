package app

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/bkim0128/stock/server/src/system/router"

	"github.com/go-xorm/xorm"
	"github.com/gorilla/handlers"
	"github.com/joho/godotenv"
)

// Server struct contains a port number and a reference to a connected database.
type Server struct {
	port string
	Db   *xorm.Engine
}

// NewServer simply returns a new Server.
func NewServer() Server {
	return Server{}
}

// Init function initializes the server with the given port number and database.
func (s *Server) Init(port string, db *xorm.Engine) {
	log.Println("Initializing server...")
	s.port = ":" + port
	s.Db = db

	if err := godotenv.Load(); err != nil {
		fmt.Println("unable to load .env file")
		// panic(err)
	}

	envPort := os.Getenv("PORT")
	if len(envPort) > 0 {
		port = envPort
	}

}

// Start will start up the server listening to requests to its given port number.
func (s *Server) Start() {
	log.Println("Starting server on port" + s.port)

	r := router.NewRouter()
	r.Init(s.Db)

	handler := handlers.LoggingHandler(os.Stdout, handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Origin", "Cache-Control", "X-App-Token"}),
		handlers.ExposedHeaders([]string{""}),
		handlers.MaxAge(1000),
		handlers.AllowCredentials(),
	)(r.Router))
	handler = handlers.RecoveryHandler(handlers.PrintRecoveryStack(true))(handler)

	newServer := &http.Server{
		Handler:      handler,
		Addr:         "0.0.0.0" + s.port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(newServer.ListenAndServe())

}

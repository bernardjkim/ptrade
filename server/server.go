package main

import (
	"flag"
	"os"
	"projects/stock_app/server/src/system/app"
	// "projects/stock_app/server/src/system/auth"

	DB "projects/stock_app/server/src/system/db"

	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"
)

// // Data asdf
// type Data struct {
// 	Date  string
// 	Open  float64
// 	Close float64
// }

// // Stock asdf
// type Stock struct {
// 	Symbol  string
// 	Current Data
// 	SD      []Data
// }

// // RequestHandler asdf
// type RequestHandler struct {
// 	db data.SDB
// }

// func (h *RequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

// 	r.ParseForm()

// 	session, _ := store.Get(r, "cookie-name")
// 	symbol := strings.ToUpper(r.FormValue("symbol"))

// 	var tmpl *template.Template

// 	// Check if user is authenticated
// 	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
// 		tmpl = templates.LoadTemplates("./tmpl/layout1.html")
// 	} else {
// 		tmpl = templates.LoadTemplates("./tmpl/layout2.html")

// 	}

// 	s := Stock{}
// 	if data, err := h.db.GetHistory(symbol); err == nil {
// 		var sd []Data
// 		for _, d := range data {
// 			sd = append(sd, Data{Date: d.Date, Open: d.Open, Close: d.Close})
// 		}

// 		// Data to be used for template
// 		s = Stock{Symbol: symbol, Current: sd[len(sd)-1], SD: sd}
// 	}

// 	templates.ExecuteTemplate(w, tmpl, s)

// }

// func homeHandler(w http.ResponseWriter, r *http.Request) {
// 	tmpl := templates.LoadTemplates("./tmpl/index.html")
// 	templates.ExecuteTemplate(w, tmpl, nil)
// }

// func loginHandler(w http.ResponseWriter, r *http.Request) {
// 	tmpl := templates.LoadTemplates("./tmpl/login.html")
// 	templates.ExecuteTemplate(w, tmpl, nil)
// }

// func registrationHandler(w http.ResponseWriter, r *http.Request) {
// 	tmpl := templates.LoadTemplates("./tmpl/registration.html")
// 	templates.ExecuteTemplate(w, tmpl, nil)
// }

// func (h *RequestHandler) authHandler(w http.ResponseWriter, r *http.Request) {
// 	// TODO stay on same page if auth failed
// 	r.ParseForm()

// 	email := r.FormValue("Email")
// 	password := r.FormValue("Password")

// 	fmt.Println("email: ", email)
// 	fmt.Println("pass: ", password)

// 	w.Header().Set("Content-Type", "application/json")

// 	// type Message struct {
// 	// 	Auth bool
// 	// }

// 	// m := Message{Auth: false}
// 	tmpl := templates.LoadTemplates("./tmpl/login.html")

// 	acc, err := h.db.GetAccount(email)
// 	if err != nil {
// 		fmt.Println("authentication failed")
// 		w.WriteHeader(http.StatusUnauthorized)
// 		// w.Write()
// 		// b, _ := json.Marshal(m)
// 		// w.Write(b)
// 		return
// 	}

// 	if match := auth.CheckPasswordHash(password, acc.Hash); !match {
// 		fmt.Println("authentication failed")
// 		w.WriteHeader(http.StatusUnauthorized)
// 		// w.Write()
// 		// b, _ := json.Marshal(m)
// 		// w.Write(b)
// 		return
// 	}

// 	// start new session
// 	login(w, r)
// 	fmt.Println("authentication successful")
// 	w.WriteHeader(http.StatusOK)
// 	templates.ExecuteTemplate(w, tmpl, nil)

// }

// func (h *RequestHandler) registerHandler(w http.ResponseWriter, r *http.Request) {

// 	r.ParseForm()

// 	email := r.FormValue("Email")
// 	password := r.FormValue("Password")

// 	var tmpl *template.Template

// 	if acc, _ := h.db.GetAccount(email); acc != nil {

// 		fmt.Println("email is already in use")
// 		tmpl = templates.LoadTemplates("./tmpl/registration.html")

// 	} else {

// 		hash, _ := auth.HashValue(password)
// 		h.db.RegisterAccount(email, hash)
// 		fmt.Println("registration successful")

// 		tmpl = templates.LoadTemplates("./tmpl/layout.html")
// 	}

// 	templates.ExecuteTemplate(w, tmpl, nil)
// }

// var (
// 	// key must be 16, 24 or 32 bytes long (AES-128, AES-192 or AES-256)
// 	key   = []byte("super-secret-key")
// 	store = sessions.NewCookieStore(key)
// )

// func secret(w http.ResponseWriter, r *http.Request) {
// 	session, _ := store.Get(r, "cookie-name")

// 	// Check if user is authenticated
// 	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
// 		http.Error(w, "Forbidden", http.StatusForbidden)
// 		return
// 	}

// 	fmt.Fprintln(w, "The cake is a lie!")
// }

// // start new session
// func login(w http.ResponseWriter, r *http.Request) {
// 	session, _ := store.Get(r, "cookie-name")
// 	email := r.FormValue("Email")

// 	// Set user as authenticated
// 	session.Values["authenticated"] = true
// 	session.Values["email"] = email
// 	session.Save(r, w)
// }

// func logout(w http.ResponseWriter, r *http.Request) {
// 	session, _ := store.Get(r, "cookie-name")

// 	// Revoke users authentication
// 	session.Values["authenticated"] = false
// 	session.Save(r, w)
// }

var (
	port       string
	dbhost     string
	dbport     string
	dbuser     string
	dbpass     string
	dboptions  string
	dbdatabase string
)

func init() {
	flag.StringVar(&port, "port", "8080", "Accepting the port that the server should listen on")
	flag.StringVar(&dbhost, "dbhost", "127.0.0.1", "Set the port for the application")
	flag.StringVar(&dbport, "dbport", "3306", "Set the port for the application")
	flag.StringVar(&dbuser, "dbuser", "root", "Set the port for the application")
	flag.StringVar(&dbpass, "dbpass", "pass", "Set the port for the application")
	flag.StringVar(&dboptions, "dboptions", "parseTime=true", "Set the port for the application")
	flag.StringVar(&dbdatabase, "dbdatabase", "fusion", "Set the port for the application")

	flag.Parse()

	if err := godotenv.Load("config.ini"); err != nil {
		panic(err)
	}
	if host := os.Getenv("DB_HOST"); len(host) > 0 {
		dbhost = host
	}
	if database := os.Getenv("DB_DATABASE"); len(database) > 0 {
		dbdatabase = database
	}
	if user := os.Getenv("DB_USER"); len(user) > 0 {
		dbuser = user
	}
	if password := os.Getenv("DB_PASSWORD"); len(password) > 0 {
		dbpass = password
	}
	if port := os.Getenv("DB_PORT"); len(port) > 0 {
		dbport = port
	}

	envPort := os.Getenv("PORT")
	if len(envPort) > 0 {
		port = envPort
	}
}

func main() {

	db, err := DB.Connect(dbhost, dbport, dbuser, dbpass, dbdatabase, dboptions)
	if err != nil {
		panic(err)
	}

	s := app.NewServer()
	s.Init(port, db)
	s.Start()

	// mux := http.NewServeMux()

	// // set session store options
	// store.Options = &sessions.Options{
	// 	Path:     "/",
	// 	MaxAge:   300, // 5 min cookies
	// 	HttpOnly: true,
	// }

	// // Open database connection
	// db, err := data.NewSQLDB()
	// if err != nil {
	// 	log.Fatal(err)
	// }

	// reqHandler := &RequestHandler{db: db}

	// // // Register handler
	// mux.Handle("/", reqHandler)

	// mux.HandleFunc("/login", loginHandler)
	// mux.HandleFunc("/auth", reqHandler.authHandler)
	// // mux.HandleFunc("/registration", registrationHandler)
	// // mux.HandleFunc("/register", reqHandler.registerHandler)

	// mux.HandleFunc("/secret", secret)
	// // mux.HandleFunc("/login", login)
	// mux.HandleFunc("/logout", logout)

	// mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	// http.ListenAndServe(":8080", mux)

}

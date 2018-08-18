package portfolio

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	Portfolios "github.com/bkim0128/stock/server/pkg/types/portfolios"
	ORM "github.com/bkim0128/stock/server/src/system/db"
	"github.com/bkim0128/stock/server/src/system/jwt"

	"github.com/go-xorm/xorm"
)

var db *xorm.Engine

type PortfolioData struct {
	Portfolio Portfolios.Portfolio `json:"portfolio"`
}

func Init(DB *xorm.Engine) {
	db = DB
}

func GetStocks(w http.ResponseWriter, r *http.Request) {
	tokenVal := r.Header.Get("X-App-Token")
	fmt.Println(r.Header.Get("Cookie"))
	fmt.Println(tokenVal)

	tokenVal = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzUwNzg5OTcsImlhdCI6MTUzNDQ3NDE5NywiaWQiOjF9.LCPzdKhVac_QhvBpn5ACNhxpHPjJa5otuI6_c8FTeHzxu2USuz7RXFIc-Q5jYZcAvo-Bz88ly1aY4TCljRdGiKjulDEdMCV0i2IZU0keHZr9cbT-05GMav5gV9bl7lEz-4FF84qdM4j9-Kg8gz-LwWNdXuI1KgC2m40eCoykMhLmp57Ln_y_4x0hWyhnYKIiaRuvR9qpbLstd7XOdbMH_8W3AD9HWEIMaVr2Vk2h3DrDeh98TBSnTiyRGgNAxUn3u2LPx7NYCsOn9BG30bdC1gdbURrnGCn2ku9eAkrN7u2NfyNldNlGxhFLuyDZl35eB-wipJhEWhOylwPH3-CeIEU44lwMEVSqPy55zfu0ud3rteML1VF32EBf1gdoLWopo9aSVJYXFOs5BAGyLBawAh26B81KC0-BP3aHGjEZ0LLfp-28BXLWwYe0megxFkKcAsw4ioOU4iT_b_XAl3rKdmsfibCAVTr7T9p07u3mH3cXsWAcrMruaOssIiS5qo1v66RmK3sHHOa1cLKvyOGUzAgVWV_g_CNSZLMcF9MUJvEB--St6epuurJddrLgzZY8Ks42IwKX7UxgAVA-6vqrT697VW7VqEw7LLiyVG433dnjbMfoKHXufBd4PliDjwZx3MDh4Fe5EtPZqUBWSnz9pimbzrcDNww0iZVu9hjd1uE"
	if len(tokenVal) < 1 {
		log.Println("Ignoring request. No token present.")
		http.Error(w, "Token required for check.", http.StatusUnauthorized)
		return
	}

	user, err := jwt.GetUserFromToken(db, tokenVal)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	portfolio := Portfolios.Portfolio{UserId: user.ID}
	err = ORM.FindBy(db, &portfolio)
	if err != nil {
		log.Println(err)
		http.Error(w, "unable to get portfolio from database", http.StatusUnauthorized) //TODO: status code
		return
	}

	packet, err := json.Marshal(portfolio)
	if err != nil {
		log.Println(err)
		http.Error(w, "Unable to marshal json.", http.StatusUnauthorized) // TODO: status code
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(packet)
}

package jwt

import (
	"crypto/rsa"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

const (
	// privKeyPath  = "./keys/app.rsa"     // openssl genrsa -out app.rsa keysize
	// pubKeyPath   = "./keys/app.rsa.pub" // openssl rsa -in app.rsa -pubout > app.rsa.pub
	HOURS_IN_DAY = 24
	DAYS_IN_WEEK = 7
)

// private & public key pointers
var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

// Parse private & public keys
func init() {
	var (
		signBytes   []byte
		verifyBytes []byte
		err         error
	)

	// Load env variables
	if err := godotenv.Load(); err != nil {
		fmt.Println("unable to load .env file")
	}

	signBytes = []byte(os.Getenv("PRIVATE_KEY"))
	signKey, err = jwt.ParseRSAPrivateKeyFromPEM(signBytes)
	if err != nil {
		panic(err)
	}

	verifyBytes = []byte(os.Getenv("PUBLIC_KEY"))
	verifyKey, err = jwt.ParseRSAPublicKeyFromPEM(verifyBytes)
	if err != nil {
		panic(err)
	}
}

// Get token by id
func GetToken(id int64) string {
	token := jwt.New(jwt.SigningMethodRS512)
	claims := make(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Hour * HOURS_IN_DAY * DAYS_IN_WEEK).Unix()
	claims["iat"] = time.Now().Unix()
	claims["id"] = id
	token.Claims = claims

	tokenString, _ := token.SignedString(signKey)

	return tokenString
}

// Validate token
func IsTokenValid(val string) (int64, error) {
	token, err := jwt.Parse(val, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})

	switch err.(type) {
	case nil:
		if !token.Valid {
			return 0, errors.New("Token is invalid")
		}

		var user_id int64

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return 0, errors.New("Token is invalid")
		}

		user_id = int64(claims["id"].(float64))

		return user_id, nil
	case *jwt.ValidationError:
		vErr := err.(*jwt.ValidationError)

		switch vErr.Errors {
		case jwt.ValidationErrorExpired:
			return 0, errors.New("Token Expired, get a new one.")
		default:
			log.Println(vErr)
			return 0, errors.New("Error while Parsing Token!")
		}
	default:
		return 0, errors.New("Unable to parse token")
	}
}

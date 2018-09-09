package jwt

import (
	"crypto/rsa"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

const (
	hoursInDay = 24
	daysInWeek = 7
)

// private & public key pointers
var (
	verifyKey *rsa.PublicKey
	signKey   *rsa.PrivateKey
)

// Error codes returned by failures to validate token
var (
	ErrInvalidToken = errors.New("jwt: token is invalid")
	ErrExpiredToken = errors.New("jwt: token has expired")
	ErrParsingToken = errors.New("jwt: unable to parse token")
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

// GetToken returns a jwt token string assigned to the given id
func GetToken(id int64) string {
	token := jwt.New(jwt.SigningMethodRS512)
	claims := make(jwt.MapClaims)
	// claims["exp"] = time.Now().Add(time.Hour * hoursInDay * daysInWeek).Unix()
	claims["exp"] = time.Now().Add(time.Hour).Unix() // token expires in one hour
	claims["iat"] = time.Now().Unix()
	claims["id"] = id
	token.Claims = claims

	tokenString, _ := token.SignedString(signKey)

	return tokenString
}

// IsTokenValid will validate a token. This function accepts a token string val
// and will return the user id assigned to that token and nil error.
// If the token string is invalid, this function will return 0 for user id and
// an error.
func IsTokenValid(val string) (int64, error) {
	token, err := jwt.Parse(val, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})

	switch err.(type) {
	case nil:
		if !token.Valid {
			return 0, ErrInvalidToken
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return 0, ErrInvalidToken
		}

		userID := int64(claims["id"].(float64))
		return userID, nil

	case *jwt.ValidationError:
		vErr := err.(*jwt.ValidationError)

		switch vErr.Errors {
		case jwt.ValidationErrorExpired:
			return 0, ErrExpiredToken

		default:
			return 0, ErrParsingToken
		}

	default:
		return 0, ErrParsingToken
	}
}

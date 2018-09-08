package passwords

import "golang.org/x/crypto/bcrypt"

const (
	salt = 10
)

// IsValid validates the given password. If the given hash and password match,
// then this IsValid will return true, false otherwise.
func IsValid(hash string, password string) bool {
	if bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) != nil {
		return false
	}
	return true
}

// Encrypt will encrypt the given password and return the hash string and
// any errors.
func Encrypt(password string) (string, error) {
	str, err := bcrypt.GenerateFromPassword([]byte(password), salt)
	return string(str), err
}

package db

import (
	// import necessary to register mysql driver
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
)

// Connect will attempt to connect to the specified database.
// Will return an xorm Engine and possible error.
func Connect(host string, port string, user string, pass string, database string, options string) (db *xorm.Engine, err error) {
	return xorm.NewEngine("mysql", user+":"+pass+"@tcp("+host+":"+port+")/"+database+"?charset=utf8&"+options)
}

// Find will fetch mutliple rows matching findBy query and populate objects
// with the results. Find will return any errors.
func Find(DB *xorm.Engine, findBy interface{}, objects interface{}) error {
	return DB.Find(objects, findBy)
}

// FindBy will return a single result matching the model. Returns any errors.
func FindBy(DB *xorm.Engine, model interface{}) (err error) {
	_, err = DB.Get(model)
	return
}

// Exists check if the given model exists in the database. Returns a boolean
// value and any error. Returns true if model exists in database, false otherwise.
func Exists(DB *xorm.Engine, model interface{}) (bool, error) {
	return DB.Get(model)
}

// Update will update the database with the given model. Returns any errors.
func Update(DB *xorm.Engine, id int64, model interface{}) (err error) {
	_, err = DB.Id(id).Update(model)
	return
}

// Store will insert the given model into the database. Returns any errors.
func Store(DB *xorm.Engine, model interface{}) (err error) {
	_, err = DB.Insert(model)
	return
}

// Destroy will delete the given model from the database. Returns any errors.
func Destroy(DB *xorm.Engine, id int64, model interface{}) (err error) {
	_, err = DB.Id(id).Delete(model)
	return
}

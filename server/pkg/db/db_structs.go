package db

type Users struct{
	ID int64	`xorm:"ID" json:"ID" schema:"ID"`
	First string	`xorm:"First" json:"First" schema:"First"`
	Last string	`xorm:"Last" json:"Last" schema:"Last"`
	Email string	`xorm:"Email" json:"Email" schema:"Email"`
	Password string	`xorm:"Password" json:"Password" schema:"Password"`
}
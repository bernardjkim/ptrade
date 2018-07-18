package templates

import (
	"html/template"
	"log"
	"net/http"
)

// LoadTemplates loads and returns filename HTML template
func LoadTemplates(filename string) *template.Template {
	return template.Must(template.ParseFiles(filename))
}

// ExecuteTemplate executes tmpl with given data
func ExecuteTemplate(w http.ResponseWriter, tmpl *template.Template, data interface{}) {
	err := tmpl.Execute(w, data)
	if err != nil {
		log.Fatal(err)
	}
}

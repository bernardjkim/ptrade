GCC=go
GCMD=run
GPATH=server.go

RA512=4096
RA256=2048


run:
	$(GCC) $(GCMD) $(GPATH)

build:
	make build_db

build_db:
	rm -f pkg/db/db_structs.go
	go run db_build.go -json=./pkg/db/config.json
	mv db_structs.go pkg/db/

install:
	make install_db
	make install_encryption
	make install_jwt
	make install_routes

install_db:
	go get -u github.com/go-xorm/xorm
install_encryption:
	go get -u golang.org/x/crypto/bcrypt
install_jwt:
	go get -u github.com/dgrijalva/jwt-go
install_routes:
	go get -u github.com/gorilla/mux

create_keys:
	mkdir -p keys
	yes | ssh-keygen -t rsa -b 4096 -f keys/app.rsa -N ''
	openssl rsa -in keys/app.rsa -pubout -outform PEM -out keys/app.rsa.pub

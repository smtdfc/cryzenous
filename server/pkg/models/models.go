package models

import (
    "context"
    "log"
    "os"
    "entgo.io/ent/dialect"
    _ "github.com/go-sql-driver/mysql"
    "github.com/smtdfc/cryzenous/pkg/ent"
)

var Client *ent.Client
var Ctx context.Context

func InitModels() {
    var err error

    Client, err = ent.Open(dialect.MySQL, os.Getenv("DATABASE_DSN"))
    if err != nil {
        log.Fatalf("failed opening connection to mysql: %v", err)
    }

    Ctx = context.Background()

    if err := Client.Schema.Create(Ctx); err != nil {
        log.Fatalf("failed creating schema resources: %v", err)
    }
}


func CloseModels() {
    if Client != nil {
        Client.Close()
    }
}
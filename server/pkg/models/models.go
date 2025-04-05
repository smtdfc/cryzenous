package models

import (
    "context"
    "log"
    "github.com/smtdfc/cryzenous/pkg/ent"
    "entgo.io/ent/dialect"
    _ "github.com/go-sql-driver/mysql"
    "os"
)

var client *ent.Client

func InitModels() {
    var err error
   client, err = ent.Open(dialect.MySQL, os.Getenv("DATABASE_DSN"))
    if err != nil {
        log.Fatalf("failed opening connection to mysql: %v", err)
    }
    defer client.Close()

    ctx := context.Background()
    if err := client.Schema.Create(ctx); err != nil {
        log.Fatalf("failed creating schema resources: %v", err)
    }
}
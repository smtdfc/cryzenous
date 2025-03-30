package models

import (
    "gorm.io/driver/postgres"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "log"
    "os"
)

var Database *gorm.DB
func InitModels() {
    
    var err error

    dbType := os.Getenv("DATABASE_TYPE")
    if dbType == "postgres" {
        dsn := os.Getenv("DATABASE_DSN")
        Database, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
    } else {
        Database, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    }

    if err != nil {
        log.Fatal(err)
    }
    /*
    Generate()
    Migration()
    */
    log.Println("Database connected !")
}
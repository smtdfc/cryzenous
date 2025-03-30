package models

import "time"

type Project struct {
    ID        uint       `gorm:"primaryKey"`
    Name      string
    Metadata  string
    CreatedAt time.Time
    Owner     *string   `gorm:"default:null"` 
    Tasks     []Task  `gorm:"foreignKey:ProjectID"`
}

type Task struct {
    ID        uint      `gorm:"primaryKey"`
    Name      string
    Metadata  string
    CreatedAt time.Time
    ProjectID uint    
}
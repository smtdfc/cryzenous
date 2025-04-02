package models

import "time"

type Project struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    Name      string     `json:"name"`
    Metadata  string     `json:"metadata"`
    CreatedAt time.Time  `json:"createdAt"`
    Owner     *string    `gorm:"default:null" json:"owner"` 
    Tasks     []Task     `gorm:"foreignKey:ProjectID" json:"tasks"`
}

type Task struct {
    ID        uint      `gorm:"primaryKey" json:"id"`
    Name      string    `json:"name"`
    Metadata  string    `json:"metadata"`
    CreatedAt time.Time `json:"createdAt"`
    ProjectID uint      `json:"projectId"`
}
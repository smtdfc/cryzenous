package services

import (
	"github.io/smtdfc/cryzenous/pkg/models"
	"log"
)

type ProjectService struct{}

func (ProjectService) List() []models.Project {
	var projects []models.Project
	
	err := models.Database.Select("ID", "Name", "Metadata").Find(&projects).Error
	if err != nil {
		log.Println("Error fetching projects:", err)
		return []models.Project{}
	}

	return projects
}
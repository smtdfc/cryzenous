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

func (ProjectService) GetByID(id uint) (models.Project, error) {
	var project models.Project
	err := models.Database.First(&project, id).Error
	if err != nil {
		log.Println("Error fetching project by ID:", err)
		return models.Project{}, err
	}
	return project, nil
}

func (ProjectService) Create(name string, metadata string, owner *string) (models.Project, error) {
	project := models.Project{
		Name:     name,
		Metadata: metadata,
		Owner:    owner,
	}

	err := models.Database.Create(&project).Error
	if err != nil {
		log.Println("Error creating project:", err)
		return models.Project{}, err
	}

	return project, nil
}

func (ProjectService) Update(id uint, name string, metadata string, owner *string) (models.Project, error) {
	var project models.Project
	err := models.Database.First(&project, id).Error
	if err != nil {
		log.Println("Error fetching project to update:", err)
		return models.Project{}, err
	}

	project.Name = name
	project.Metadata = metadata
	project.Owner = owner

	err = models.Database.Save(&project).Error
	if err != nil {
		log.Println("Error updating project:", err)
		return models.Project{}, err
	}

	return project, nil
}

func (ProjectService) Delete(id uint) error {
	var project models.Project
	err := models.Database.First(&project, id).Error
	if err != nil {
		log.Println("Error fetching project to delete:", err)
		return err
	}

	err = models.Database.Delete(&project).Error
	if err != nil {
		log.Println("Error deleting project:", err)
		return err
	}

	return nil
}
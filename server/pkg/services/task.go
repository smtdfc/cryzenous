package services

import (
	"fmt"
	"time"
	"github.com/google/uuid"
	"github.com/smtdfc/cryzenous/pkg/ent"
	"github.com/smtdfc/cryzenous/pkg/ent/task"
	"github.com/smtdfc/cryzenous/pkg/models"
)

type TaskService struct{}

func (TaskService) Create(name string, projectID string) (*ent.Task, error) {
	parsedUUID, err := uuid.Parse(projectID)
	if err != nil {
		return nil, fmt.Errorf("Invalid Project ID!")
	}
	
	task, err := models.Client.Task.
		Create().
		SetName(name).
		SetCreateAt(time.Now().Format(time.RFC3339)).
		SetProjectID(parsedUUID). 
		Save(models.Ctx)
		
	if err != nil {
		return nil, fmt.Errorf("failed creating task: %w", err)
	}

	return task, nil
}

func (TaskService) List(projectID string) ([]*ent.Task, error) {
		parsedUUID, err := uuid.Parse(projectID)
		if err != nil {
			return nil, fmt.Errorf("Invalid Project ID!")
		}
	
    u,err:= models.Client.Task.
    	Query().
    	Where(task.ProjectID(parsedUUID)).
    	All(models.Ctx)
    if err != nil {
        return nil, fmt.Errorf("failed get task: %w", err)
    }

    return u, nil
}

func (TaskService) Delete(id string,projectID string ) (bool, error) {
		taskUUID, err := uuid.Parse(id)
		if err != nil {
			return false, fmt.Errorf("Invalid Project ID !")
		}
		
		projectUUID, err := uuid.Parse(projectID)
		if err != nil {
			return false, fmt.Errorf("Invalid Project ID!")
		}
		
    _,err = models.Client.Task.
    	Delete().
    	Where(
    		task.ID(taskUUID),
    		task.ProjectID(projectUUID),
    	).
    	Exec(models.Ctx)
    
    if err != nil {
        return false, fmt.Errorf("Task doesn't exist !")
    }

    return true, nil
}
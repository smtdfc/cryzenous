package services

import (
	"time"
	"fmt"
	"github.com/google/uuid"
	"github.com/smtdfc/cryzenous/pkg/ent"
	"github.com/smtdfc/cryzenous/pkg/ent/project"
	"github.com/smtdfc/cryzenous/pkg/models"
)

type ProjectService struct{}

func (ProjectService) Create(name string) (*ent.Project, error) {
    u,err:= models.Client.Project.
    	Create().
    	SetName(name).
    	SetCreateAt(time.Now().Format(time.RFC3339)).
    	Save(models.Ctx)
    if err != nil {
        return nil, fmt.Errorf("failed creating project: %w", err)
    }

    return u, nil
}

func (ProjectService) List() ([]*ent.Project, error) {
    u,err:= models.Client.Project.
    	Query().
    	All(models.Ctx)
    if err != nil {
        return nil, fmt.Errorf("failed get project: %w", err)
    }

    return u, nil
}

func (ProjectService) Info(id string) (*ent.Project, error) {
		parsedUUID, err := uuid.Parse(id)
		if err != nil {
			return nil, fmt.Errorf("Invalid Project ID !")
		}
		
    u,err:= models.Client.Project.
    	Query().
    	Where(project.ID(parsedUUID)).
    	Only(models.Ctx)
    if err != nil {
        return nil, fmt.Errorf("Project doesn't exist !")
    }

    return u, nil
}

func (ProjectService) Delete(id string) (bool, error) {
		parsedUUID, err := uuid.Parse(id)
		if err != nil {
			return false, fmt.Errorf("Invalid Project ID !")
		}
		
    _,err = models.Client.Project.
    	Delete().
    	Where(project.ID(parsedUUID)).
    	Exec(models.Ctx)
    	
    if err != nil {
        return false, fmt.Errorf("Project doesn't exist !")
    }

    return true, nil
}
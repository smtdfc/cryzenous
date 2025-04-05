package services

import (
	"time"
	"fmt"
	"github.com/smtdfc/cryzenous/pkg/ent"
	"github.com/smtdfc/cryzenous/pkg/models"
)

type ProjectService struct{}

func (ProjectService) Create(name string) (*ent.Project, error) {
    u,err:= models.Client.Project.
    	Create().
    	SetName(name).
    	SetCreateAt(time.Now()).
    	Save(models.Ctx)
    if err != nil {
        return nil, fmt.Errorf("failed creating project: %w", err)
    }

    return u, nil
}
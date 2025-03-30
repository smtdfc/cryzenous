package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.io/smtdfc/cryzenous/pkg/services"
)

type ProjectsController struct{}

func (ProjectsController) List(c *fiber.Ctx) error {
	projects := services.ProjectService{}.List()
	return c.JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"list": projects,
		},
	})
}

func (ProjectsController) Create(c *fiber.Ctx) error {
	projects := services.ProjectService{}.List()
	return c.JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"list": projects,
		},
	})
}
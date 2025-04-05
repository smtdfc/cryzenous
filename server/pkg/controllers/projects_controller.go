package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/smtdfc/cryzenous/pkg/services"
	"log"
	
)

type ProjectsController struct{}



func (ProjectsController) Create(c *fiber.Ctx) error {
	var request struct {
		Name     string  `json:"name"`
	}

	if err := c.BodyParser(&request); err != nil {
	  log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	project, err := services.ProjectService{}.Create(request.Name)
	if err != nil {
		log.Println("Error creating project:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to create project",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"project": project,
		},
	})
}

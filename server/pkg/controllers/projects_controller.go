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
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to create project",
		})
	}

	return c.Status(200).JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"project": project,
		},
	})
}

func (ProjectsController) List(c *fiber.Ctx) error {
	var request struct {
		Limit     int  `json:"limit"`
		Offset int `json:"offset"`
	}

	if err := c.BodyParser(&request); err != nil {
	  log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	projects, err := services.ProjectService{}.List()
	if err != nil {
		log.Println("Error getting project:", err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to getting project",
		})
	}

	return c.Status(200).JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"list": projects,
		},
	})
}

func (ProjectsController) Info(c *fiber.Ctx) error {
	var request struct {
		ID     string  `json:"id"`
	}

	if err := c.BodyParser(&request); err != nil {
	  log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	project, err := services.ProjectService{}.Info(request.ID)
	if err != nil {
		log.Println("Error get info of project:", err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to get info of project",
		})
	}

	return c.Status(200).JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"info": project,
		},
	})
}

func (ProjectsController) Delete(c *fiber.Ctx) error {
	var request struct {
		ID     string  `json:"id"`
	}

	if err := c.BodyParser(&request); err != nil {
	  log.Println(err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	_, err := services.ProjectService{}.Delete(request.ID)
	if err != nil {
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to delete  of project",
		})
	}

	return c.Status(200).JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{},
	})
}

package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.io/smtdfc/cryzenous/pkg/services"
	"strconv"
	"log"
	
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
	var request struct {
		Name     string  `json:"name"`
		Metadata string  `json:"metadata"`
		Owner    *string `json:"owner"`
	}

	if err := c.BodyParser(&request); err != nil {
	  log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	project, err := services.ProjectService{}.Create(request.Name, request.Metadata, request.Owner)
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

func (ProjectsController) GetByID(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid project ID",
		})
	}

	project, err := services.ProjectService{}.GetByID(uint(id))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(map[string]interface{}{
			"status": "error",
			"message": "Project not found",
		})
	}

	return c.JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"project": project,
		},
	})
}

func (ProjectsController) Update(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid project ID",
		})
	}

	var request struct {
		Name     string  `json:"name"`
		Metadata string  `json:"metadata"`
		Owner    *string `json:"owner"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	project, err := services.ProjectService{}.Update(uint(id), request.Name, request.Metadata, request.Owner)
	if err != nil {
		log.Println("Error updating project:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to update project",
		})
	}

	return c.JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"project": project,
		},
	})
}

func (ProjectsController) Delete(c *fiber.Ctx) error {
	idStr := c.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid project ID",
		})
	}

	err = services.ProjectService{}.Delete(uint(id))
	if err != nil {
		log.Println("Error deleting project:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to delete project",
		})
	}

	return c.JSON(map[string]interface{}{
		"status": "success",
		"message": "Project deleted successfully",
	})
}
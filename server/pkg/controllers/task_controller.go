package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/smtdfc/cryzenous/pkg/services"
	"log"
	
)

type TaskController struct{}

func (TaskController) Create(c *fiber.Ctx) error {
	var request struct {
		Name     string  `json:"name"`
		ProjectID string  `json:"projectID"`
	}

	if err := c.BodyParser(&request); err != nil {
	  log.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	task, err := services.TaskService{}.Create(request.Name, request.ProjectID)
	if err != nil {
		log.Println("Error creating task:", err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to create task",
		})
	}

	return c.Status(200).JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"task": task,
		},
	})
}

func (TaskController) List(c *fiber.Ctx) error {
	var request struct {
		ProjectID string  `json:"projectID"`
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

	_, err := services.ProjectService{}.Info(request.ProjectID)
	if err != nil {
		log.Println("Error get info of project:", err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid project ID",
		})
	}
	
	tasks, err := services.TaskService{}.List(request.ProjectID)
	if err != nil {
		log.Println("Error getting task:", err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Failed to getting task",
		})
	}

	return c.Status(200).JSON(map[string]interface{}{
		"status": "success",
		"results": map[string]interface{}{
			"list": tasks,
		},
	})
}

func (TaskController) Delete(c *fiber.Ctx) error {
	var request struct {
		ID     string  `json:"id"`
		ProjectID     string  `json:"projectID"`
	}

	if err := c.BodyParser(&request); err != nil {
	  log.Println(err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid request body",
		})
	}

	_, err := services.ProjectService{}.Info(request.ProjectID)
	if err != nil {
		log.Println("Error get info of project:", err)
		return c.Status(400).JSON(map[string]interface{}{
			"status": "error",
			"message": "Invalid project ID",
		})
	}
	
	_, err = services.TaskService{}.Delete(request.ID,request.ProjectID)
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

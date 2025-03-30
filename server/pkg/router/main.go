package router

import (
	"github.com/gofiber/fiber/v2"
	"github.io/smtdfc/cryzenous/pkg/controllers"
)


func InitRouter(app *fiber.App){
  
  app.Post("/api/v1/projects/list", controllers.ProjectsController{}.List)
  app.Get("/", func(c *fiber.Ctx) error {
  		return c.SendString("Hello, Fiber!")
  })
  
  
}
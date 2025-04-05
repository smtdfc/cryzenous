package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/smtdfc/cryzenous/pkg/controllers"
)


func InitRouter(app *fiber.App){
  
  app.Post("/api/v1/projects/list", controllers.ProjectsController{}.List)
  app.Post("/api/v1/projects/create", controllers.ProjectsController{}.Create)
  app.Post("/api/v1/projects/info/:id", controllers.ProjectsController{}.GetByID)
  app.Post("/api/v1/projects/update/:id", controllers.ProjectsController{}.Update)
  app.Post("/api/v1/projects/remove/:id", controllers.ProjectsController{}.Delete)
  app.Get("/", func(c *fiber.Ctx) error {
  		return c.SendString("Hello, Fiber!")
  })
}
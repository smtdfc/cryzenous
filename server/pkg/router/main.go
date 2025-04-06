package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/smtdfc/cryzenous/pkg/controllers"
)


func InitRouter(app *fiber.App){
	
	app.Post("/api/v1/projects/delete", controllers.ProjectsController{}.Delete)
  app.Post("/api/v1/projects/info", controllers.ProjectsController{}.Info)
  app.Post("/api/v1/projects/list", controllers.ProjectsController{}.List)
  app.Post("/api/v1/projects/create", controllers.ProjectsController{}.Create)
  /*
  app.Post("/api/v1/projects/update/:id", controllers.ProjectsController{}.Update)
    */
  
  app.Post("/api/v1/tasks/create", controllers.TaskController{}.Create)
	app.Post("/api/v1/tasks/list", controllers.TaskController{}.List)
	app.Post("/api/v1/tasks/delete", controllers.TaskController{}.Delete)

  app.Get("/", func(c *fiber.Ctx) error {
  		return c.SendString("Hello, Fiber!")
  })
}
package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/smtdfc/cryzenous/pkg/models"
	"github.com/smtdfc/cryzenous/pkg/router"
	"github.com/joho/godotenv"
	"os"
	"log"
)

func main() {
  err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	
	allowOrigins := os.Getenv("ALLOW_ORIGINS")
	if allowOrigins == "" {
		allowOrigins = "http://localhost:7700"
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: allowOrigins,
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	defer models.CloseModels()
	models.InitModels()
	router.InitRouter(app)

	log.Println("Server is starting on port 3000...")
	app.Listen(":3000")
}
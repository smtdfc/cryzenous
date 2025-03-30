package models

import (
	"fmt"
	"log"
	"time"

)

func Generate() {

	for i := 1; i <= 30; i++ {
		project := Project{
			Name:     fmt.Sprintf("Project %d", i),
			Metadata: fmt.Sprintf("Metadata for Project %d", i),
			CreatedAt: time.Now(),
			Owner:    nil,
		}

		if err := Database.Create(&project).Error; err != nil {
			log.Fatal("Error creating project:", err)
		}


		for j := 1; j <= 3; j++ {
			task := Task{
				Name:      fmt.Sprintf("Task %d for Project %d", j, i),
				Metadata:  fmt.Sprintf("Metadata for Task %d of Project %d", j, i),
				CreatedAt: time.Now(),
				ProjectID: project.ID,
			}


			if err := Database.Create(&task).Error; err != nil {
				log.Fatal("Error creating task:", err)
			}
		}
	}

	fmt.Println("Generated 30 projects with 3 tasks each!")
}


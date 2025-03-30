package models

func Migration(){
  if(Database != nil){
    Database.AutoMigrate(
      &Task{},
      &Project{},
    )
  }
}
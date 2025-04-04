export class CryzenousProject{
  constructor(id,name,metadata={}){
    this.id = id;
    this.name = name;
    this.metadata = metadata;
    this.tasks = [];
  }
  
}
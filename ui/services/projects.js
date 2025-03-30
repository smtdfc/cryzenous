import { CryzenousProject } from '../models/CryzenousProject.js';
import { AppContext } from '../contexts/app.js';

export class CryzenousProjectManagerService {
  static fetch() {
    AppContext.set("projects", [
      new CryzenousProject("Project 1", {})
    ])
  }
  
  static list() {
    return AppContext.data.projects;
  }
  
  static async create(name) {
    let project = new CryzenousProject(name, {});
    AppContext.data.projects.produce((value) => {
      value.push(project);
      return value;
    });
    return project;
  }
  
}
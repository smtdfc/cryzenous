import ky from "ky";
import { CryzenousProject } from "../models/CryzenousProject.js";
import { AppContext } from "../contexts/app.js";

const backendURL = process.env.BACKEND_URL;

export class CryzenousProjectManagerService {
  static async fetch() {
    try {
      
      let rawData = await ky.post(`${backendURL}/api/v1/projects/list`, {
        retry: 0
      }).json();
      let projects = [];
      
      if (Array.isArray(rawData.results?.list)) {
        rawData.results.list.forEach((info) => {
          projects.push(new CryzenousProject(info.name, info.metadata));
        });
      }
      
      AppContext.get("projects").set(projects)
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }
  
  static list() {
    return AppContext.data.projects || [];
  }
  
  static async create(name) {
    let rawData = await ky.post(`${backendURL}/api/v1/projects/create`, {
      retry: 0,
      json:{
        name:name,
        metadata:"{}"
      }
    }).json();
    let project = new CryzenousProject(name, {});
    AppContext.data.projects.append(project);
    return project;
  }
}
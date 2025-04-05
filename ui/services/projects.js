import ky from 'ky';
import { CryzenousProject } from '../models/CryzenousProject.js';
import { AppContext } from '../contexts/app.js';

const backendURL = process.env.BACKEND_URL;

export class CryzenousProjectManagerService {
  static async fetch() {
    const existing = AppContext.get('projects');
    if (existing?.value?.length) return existing.value;
    
    try {
      const { results } = await ky.post(`${backendURL}/api/v1/projects/list`, { retry: 0 }).json();
      const projects = results?.list?.map(info => new CryzenousProject(info.id, info.name, info.metadata)) || [];
      AppContext.get('projects').set(projects);
      return projects;
    } catch (error) {
      throw error;
    }
  }
  
  static list() {
    return AppContext.data.projects || [];
  }
  
  static async create(name) {
    await ky.post(`${backendURL}/api/v1/projects/create`, { retry: 0, json: { name, metadata: '{}' } }).json();
    const project = new CryzenousProject(name, {});
    AppContext.data.projects.append(project);
    return project;
  }
  
  static async info(id) {
    
    const cached = AppContext.data.projects?.find(p => p.id === id);
    if (cached) return cached;
    
    try {
      const { results } = await ky.post(`${backendURL}/api/v1/projects/info/${id}`, { retry: 0 }).json();
      return new CryzenousProject(results?.project.id, results?.project.name, results?.project.metadata);
    } catch (error) {
      throw error;
    }
  }
}
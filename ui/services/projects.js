import ky from 'ky';
import { CryzenousProject } from '../models/CryzenousProject.js';
import { AppContext } from '../contexts/app.js';

const backendURL = process.env.BACKEND_URL;

export class CryzenousProjectManagerService {
	static async fetch(limit = 30, offset = 0) {
		const existing = AppContext.get('projects');
		if (existing?.value?.length) return existing.value;
		const { results } = await ky.post(`${backendURL}/api/v1/projects/list`, { retry: 0, json: { limit, offset } }).json();
		const projects = results?.list?.map(info => CryzenousProject.generate(info)) || [];
		AppContext.get('projects').set(projects);
		return projects;
	}
	
	static list() {
		return AppContext.data.projects || [];
	}
	
	static async create(name) {
		let { results } = await ky.post(`${backendURL}/api/v1/projects/create`, { retry: 0, json: { name, metadata: '{}' } }).json();
		let project = CryzenousProject.generate(results.project);
		AppContext.data.projects.append(project);
		return project;
	}
	
	static async info(id) {
		const cached = AppContext.data.projects?.find(p => p.id === id);
		if (cached) return cached;
		const { results } = await ky.post(`${backendURL}/api/v1/projects/info`, { retry: 0, json: { id } }).json();
		return CryzenousProject.generate(results.info);
		
	}
	
	static async delete(id) {
		await ky.post(`${backendURL}/api/v1/projects/delete`, { retry: 0, json: { id } }).json();
		const index = AppContext.data.projects.value?.findIndex(p => p.id === id);
		AppContext.data.projects.remove(index);
		return true;
	}
}
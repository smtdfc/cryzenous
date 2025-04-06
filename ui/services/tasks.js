import ky from 'ky';
import { createArrayState } from 'rumious';
import { CryzenousTask } from '../models/CryzenousTask.js';
import { AppContext } from '../contexts/app.js';

const backendURL = process.env.BACKEND_URL;

function getProjectTasks(projectID) {
	if (!AppContext.data.tasks[projectID]) AppContext.data.tasks[projectID] = createArrayState([]);
	return AppContext.data.tasks[projectID];
}

export class CryzenousTaskManagerService {
	static async fetch(projectID, limit = 30, offset = 0) {
		const existing = getProjectTasks(projectID);
		if (existing?.value?.length) return existing.value;
		
		const { results } = await ky.post(`${backendURL}/api/v1/tasks/list`, { retry: 0, json: { limit, offset, projectID } }).json();
		const tasks = results?.list?.map(info => CryzenousTask.generate(info)) || [];
		getProjectTasks(projectID).set(tasks);
		return tasks;
	}
	
	static list(projectID) {
		return getProjectTasks(projectID).value || [];
	}
	
	static async create(name, projectID) {
		let { results } = await ky.post(`${backendURL}/api/v1/tasks/create`, { retry: 0, json: { name, projectID } }).json();
		
		let task = CryzenousTask.generate(results.task);
		getProjectTasks(projectID).append(task);
		return task;
	}
	
	static async delete(projectID,id) {
		await ky.post(`${backendURL}/api/v1/tasks/delete`, { retry: 0, json: { id ,projectID} }).json();
		const index = getProjectTasks(projectID).value?.findIndex(p => p.id === id);
		getProjectTasks(projectID).remove(index);
		return true;
	}
}
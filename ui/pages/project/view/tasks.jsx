import { RumiousComponent, createElementRef, createArrayState, syncArray } from 'rumious';
import { CryzenousTaskManagerService } from '@services/tasks.js';
import { AppContext } from '../../../contexts/app.js';
import { ToastGenerator } from 'rumious-ui';


export class Page extends RumiousComponent {
	static tag = "cryzenous-project-task-page";
	
	onCreate() {
		this.emptyAnnounmentRef = createElementRef();
		this.router = this.props.router;
		this.currentProjectID = this.router.params.id;
		if (!AppContext.data.tasks[this.currentProjectID]) AppContext.data.tasks[this.currentProjectID] = createArrayState();
		this.tasks = AppContext.data.tasks[this.currentProjectID];
	}
	
	async onRender() {
		try {
			await CryzenousTaskManagerService.fetch(this.currentProjectID);
		} catch (err) {
			ToastGenerator.show("Cannot load data !", {
				type: "danger"
			})
		}
		
		if (this.tasks.value.length === 0) {
			
			this.emptyAnnounmentRef.target.classList.remove("d-none");
		} else {
			this.emptyAnnounmentRef.target.classList.add("d-none");
		}
	}
	
	async onDeleteBtnClick(taskID) {
		if (!confirm("You really want to delete this task? This action cannot be undone")) return;
		try {
			await CryzenousTaskManagerService.delete(this.currentProjectID, taskID);
		} catch (err) {
			ToastGenerator.show("Cannot delete task !", {
				type: "danger"
			})
		}
	}
	
	template() {
		return (
			<>
        <h3>Task</h3>
        <div class="mt-5 table-container" >
        	<table class="table" style="font-size:14px!important;">
        		<thead>
        			<th>Name</th>
        			<th>Status</th>
        			<th>Created At</th>
        			<th>Actions</th>
        		</thead>
						<tbody>
	            {syncArray(this.tasks,(data) => {
		              return <tr >
		              	<td>{data.name}</td>
		              	<td>{data.status}</td>
		              	<td>{data.createAt}</td>
										<td class="d-flex align-center" >
											<button class="btn btn-icon material-icons">play_arrow</button>
											<button onClick={()=> this.router.redirect(`/project/${this.currentProjectID}/task/${data.id}/edit`)} class="btn btn-icon material-icons">edit</button>
											<button onClick={()=> this.onDeleteBtnClick(data.id)} class="btn btn-icon material-icons">delete</button>
										</td>
		              </tr>
	             })}
						</tbody>
						<tbody>
						  <tr ref="$emptyAnnounmentRef">
						    <td colspan="4" style="height: 20vh; text-align: center; vertical-align: middle; color: #888; font-size: 1.1rem;">
						      <span class="material-symbols-outlined" style="font-size: 32px; vertical-align: middle; margin-right: 0.5rem;">info</span>
						      No tasks 
						    </td>
						  </tr>
						</tbody>
					</table>
        </div>
         <button 
          class="fab material-icons" 
          onClick={() => this.router.redirect(`/project/${this.currentProjectID}/task/create`)}
        >
          add
        </button> 
      </>
		);
	}
}
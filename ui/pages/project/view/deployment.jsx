import { RumiousComponent, createElementRef, createState } from 'rumious';
import { CryzenousProjectManagerService } from '@services/projects.js';

export class Page extends RumiousComponent {
	static tag = "cryzenous-project-deployment-page";
	
	onCreate() {
		this.router = this.props.router;
		this.currentProjectID = this.router.params.id;
	}
	
	template() {
		return (
			<>
        <h3>Deployment</h3>
        <div class="mt-5 table-container" >
        	<table class="table" >
        		<thead>
        			<th>ID</th>
        			<th>Name</th>
        			<th>Task</th>
        			<th>Time</th>
        		</thead>
						<tbody>
						  <tr>
						    <td colspan="4" style="height: 20vh; text-align: center; vertical-align: middle; color: #888; font-size: 1.1rem;">
						      <span class="material-symbols-outlined" style="font-size: 32px; vertical-align: middle; margin-right: 0.5rem;">info</span>
						      No tasks are being deployed 
						    </td>
						  </tr>
						</tbody>
					</table>
        </div>
      </>
		);
	}
}
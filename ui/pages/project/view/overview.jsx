import { RumiousComponent, createState } from 'rumious';
import { CryzenousProjectManagerService } from '@services/projects.js';
import { ToastGenerator } from 'rumious-ui';

export class Page extends RumiousComponent {
	static tag = "cryzenous-project-overview-page";
	
	onCreate() {
		this.router = this.props.router;
		this.currentProjectID = this.router.params.id;
		this.projectInfo = createState({});
	}
	
	async onRender() {
		try {
			this.projectInfo.set(await CryzenousProjectManagerService.info(this.currentProjectID));
		} catch (err) {
			ToastGenerator.show("Cannot load data !", {
				type: "danger"
			})
		}
	}
	
	async onDeleteBtnClick() {
		if (!confirm("You really want to delete this project? This action cannot be undone")) return;
		try {
			await CryzenousProjectManagerService.delete(this.currentProjectID);
		} catch (err) {
			ToastGenerator.show("Cannot delete project !", {
				type: "danger"
			})
		}
		
		this.router.redirect("/",true);
	}
	
	template() {
		return (
			<>
        <h3>Project Overview</h3>
        <div class="p-5 mt-3 navbar-shadow" style="border-left:2px solid green;">
          <div class="d-flex align-center" style="column-gap:10px">
          	<h4>Project ID: </h4>
          	<span bind:text="$projectInfo.id">Loading....</span>
          </div>
          <div class="mt-3 d-flex align-center" style="column-gap:10px">
          	<h4>Project Name: </h4>
          	<span  bind:text="$projectInfo.name">Loading....</span>
          </div>
          <div class="mt-3 d-flex align-center" style="column-gap:10px">
          	<h4>Created At: </h4>
          	<span bind:text="$projectInfo.createAt">Loading....</span>
          </div>
          <div class="mt-3 d-flex align-center" style="column-gap:10px">
          	<h4>Status: </h4>
          	<span bind:text="$projectInfo.status">Active</span>
          </div>
          <div class="mt-3 d-flex align-center" style="column-gap:10px">
          	<h4>Mode: </h4>
          	<span bind:text="$projectInfo.mode">Normal</span>
          </div>
        </div>
        <br/>
        <div class="d-flex align-center justify-center" style="flex-wrap:wrap;gap:10px">
          	<button class="btn btn-primary"><i class="material-icons">edit</i> Edit</button>
          	<button class="btn btn-primary"><i class="material-icons">compare_arrows</i> Change Mode</button>
						<button on:click="onDeleteBtnClick" class="btn btn-danger"><i class="material-icons">delete</i> Remove</button>
         </div>
      </>
		);
	}
}
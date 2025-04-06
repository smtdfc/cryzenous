import { RumiousComponent, createElementRef, createState } from 'rumious';
import { CryzenousTaskManagerService } from '@services/tasks.js';

export class Page extends RumiousComponent {
  static tag = "cryzenous-page-create-task";
  
  onCreate() {
  	this.router = this.props.router;
    this.taskName = createState("");
		this.currentProjectID = this.router.params.id;
  }
  
  async onCreateBtnClick() {
    let name = this.taskName.value;
    await CryzenousTaskManagerService.create(name,this.currentProjectID);
    this.router.redirect(`/project/view/${this.currentProjectID}/task?create=true`);
  }
  
  template() {
    return (
      <>
      <div class="container" style="margin-top:5rem">
          <div class="d-flex align-center justify-start"  style="box-sizing:border-box;">
              <button onClick={()=> this.app.router.redirect(`/project/view/${this.currentProjectID}/task`)} class="btn btn-icon material-icons">arrow_back_ios</button>
              <h4>Create Task</h4> 
          </div>
          <div>
          	<h5 class="p-5">Project ID: {this.currentProjectID}</h5>
            <div class="form-group">
              <label for="projectNameInput" class="form-label">Task name:</label>
              <input id="projectNameInput" model="$taskName" class="form-input" type="text"/>
            </div>
            <div class="d-flex p-5">
              <button on:click="onCreateBtnClick" class="ml-auto btn btn-primary">Create</button>
            </div>
          </div>
      </div>
      </>
    );
  }
}
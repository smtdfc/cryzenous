import { RumiousComponent, createElementRef, createState } from 'rumious';
import { CryzenousProjectManagerService } from '@services/projects.js';

export class Page extends RumiousComponent {
  static tag = "cryzenous-page-create-project";
  
  onCreate() {
    this.projectName = createState("");
  }
  
  async onCreateBtnClick() {
    let name = this.projectName.value;
    await CryzenousProjectManagerService.create(name);
    this.app.router.redirect("/?create=true");
  }
  
  template() {
    return (
      <>
      <div class="container" style="margin-top:5rem">
          <div class="d-flex align-center justify-start"  style="box-sizing:border-box;">
              <button onClick={()=> this.app.router.redirect("/")} class="btn btn-icon material-icons">arrow_back_ios</button>
              <h4>Create project</h4> 
          </div>
          <div class="">
            <div class="form-group">
              <label class="form-label">Project name:</label>
              <input model="$projectName" class="form-input" type="text"/>
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
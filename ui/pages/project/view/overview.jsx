import { RumiousComponent, createState } from 'rumious';
import { CryzenousProjectManagerService } from '@services/projects.js';
import {ToastGenerator} from 'rumious-ui';


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
      console.log(err)
      ToastGenerator.show("Cannot load data !", {
        type: "danger"
      })
    }
  }
  
  template() {
    return (
      <>
        <h3>Project Overview</h3>
        <div class="" style="min-height:200vh">
          <h4>Project ID:</h4>
          <span bind:text="$projectInfo.id">Loading....</span>
          <h4>Project Name:</h4>
          <span bind:text="$projectInfo.name">Loading ...</span>
        </div>
      </>
    );
  }
}
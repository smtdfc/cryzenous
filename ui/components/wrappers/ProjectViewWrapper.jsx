import { RumiousComponent,createElementRef, createArrayState } from 'rumious';
import { RumiousUITab } from 'rumious-ui';
import { CryzenousProjectManagerService } from '@services/projects.js';

export class ProjectViewWrapper extends RumiousComponent {
  static tag = "cryzenous-project-view";
  
  onCreate() {
    this.tabRef = createElementRef();
    this.currentProjectID = null;
    this.router = this.props.router;
    this.tabs = [
      { name: "Overview", pattern: "/project/view/:id/overview", active: false },
      { name: "Deployment", pattern: "/project/view/:id/deployment", active: false },
      { name: "Team", pattern: "/project/view/:id/team", active: false },
    ]
  }
  
  onRouteChange() {
    const tab = new RumiousUITab(this.tabRef.target);
    const index = this.tabs.findIndex(tab => tab.pattern === this.router.currentPattern);
    if (index !== -1) tab.setTabByIndex(index);
  }
  
  onRender() {
    this.onRouteChange();
    this.router.on("change",this.onRouteChange.bind(this));
  }
  
  onDestroy(){
    this.router.off("change",this.onRouteChange.bind(this));
  }
  
  template() {
    const { routeSlot, router } = this.props;
    return (
      <>
        <div class="container" style="margin-top:5rem">
            <div class="d-flex align-center justify-start"  style="box-sizing:border-box;">
                <button onClick={()=> this.app.router.redirect("/")} class="btn btn-icon material-icons">arrow_back_ios</button>
                <h4>Project details</h4> 
            </div>
        </div>
        <div class="container">
            <div class="tabs-container" ref="$tabRef" >
              {this.tabs.map((data)=> <div class="tab" onClick={()=> router.redirect(data.pattern.replace(":id",this.currentProjectID))}>{data.name}</div>)}
              <div class="tab-indicator"></div>
            </div>
         </div>
        <br/>
        <div class="container">{routeSlot}</div>
      </>
    );
  }
}
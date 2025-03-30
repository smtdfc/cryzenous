import { RumiousComponent, createElementRef } from 'rumious';
import { AppContext } from '../contexts/app.js';
import { CryzenousProjectManagerService } from '@services/projects.js';

CryzenousProjectManagerService.fetch();

export class Page extends RumiousComponent {
  static tag = "cryzenous-page-home";
  
  onCreate() {
    this.projects = AppContext.get("projects");
    this.emptyAnnounmentRef = createElementRef();
  }
  
  onRender() {
    if (this.projects.length === 0) {
      this.emptyAnnounmentRef.target.classList.remove("d-none");
    }
  }
  
  template() {
    return (
      <> 
        <style>
          {'@media(max-width:48rem){ #searchInput{ width:90%!important; } }'}
        </style> 
        
        <div class="container" >
          <h2 class="mb-8">My Projects</h2> 
          <div class="d-flex align-center justify-center" style="width:100%;">
            <input 
              id="searchInput" 
              type="text" 
              class="m-0 form-input" 
              style="width:50%; border-radius:20px;" 
              placeholder="Search project .. "
            />
          </div> 
          <br/> 
          <ul>
            {this.projects.get().map((project, index) => (
              <li key={index} class="list-item justify-start" style="gap:10px">
                <i class="material-icons">inventory_2</i> {project.name}
              </li>
            ))}
          </ul> 
          
          <div class="d-none" 
               ref="$emptyAnnounmentRef"
               style="text-align:center; padding:2rem; color:#666;">
            <i class="material-icons" style="font-size:4rem; color:#ccc;">folder_open</i>
            <p>No projects found.</p>
          </div> 
        </div> 
        <button class="cryzenous-fab material-icons" onClick={()=> this.app.router.redirect("/project/create")}>add</button> 
      </>
    );
  }
}
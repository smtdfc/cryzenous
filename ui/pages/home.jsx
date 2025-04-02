import { RumiousComponent, createElementRef, createState,syncArray } from 'rumious';
import { AppContext } from '../contexts/app.js';
import { CryzenousProjectManagerService } from '@services/projects.js';

export class Page extends RumiousComponent {
  static tag = "cryzenous-page-home";
  
  constructor() {
    super();
    this.renderOptions = { mode: "async" };
  }
  
  onCreate() {
    this.isDataLoaded = createState(false);
    this.emptyAnnounmentRef = createElementRef();
    this.projects = AppContext.get("projects");
  }
  
  
  async onRender() {
    await CryzenousProjectManagerService.fetch();
    setTimeout(() => this.isDataLoaded.set(true), 500);
    if (this.projects.value.length === 0) {
      this.emptyAnnounmentRef.target.classList.remove("d-none");
    } else {
      this.emptyAnnounmentRef.target.classList.add("d-none");
    }
  }
  
  template() {
    return (
      <> 
        <style>
          {'@media(max-width:48rem){ #searchInput{ width:90%!important; } }'}
        </style> 

        <div class="container">
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
          <ul bind:show="$isDataLoaded">
            {
              syncArray(this.projects,(data)=>{
               return <li class="list-item justify-start" style="gap:10px">
                   <i class="material-icons">inventory_2</i> {data.name}
                </li>
              })
            }
          </ul>
          <div class="spinner-loader loader" bind:hide="$isDataLoaded" />
          <div 
            class="d-none"
            ref={this.emptyAnnounmentRef}
            style="text-align:center; padding:2rem; color:#666;"
          >
            <i class="material-icons" style="font-size:4rem; color:#ccc;">folder_open</i>
            <p>No projects found.</p>
          </div> 
        </div> 

        <button 
          class="cryzenous-fab material-icons" 
          onClick={() => this.app.router.redirect("/project/create")}
        >
          add
        </button> 
      </>
    );
  }
}
import { RumiousComponent, createElementRef, createState, syncArray } from 'rumious';
import { ToastGenerator } from 'rumious-ui';
import { AppContext } from '../contexts/app.js';
import { CryzenousProjectManagerService } from '@services/projects.js';

export class Page extends RumiousComponent {
	static tag = "cryzenous-page-home";
	
	constructor() {
		super();
		this.renderOptions = { mode: "async" };
		this.id = Date.now();
	}
	
	onCreate() {
		this.isDataLoaded = createState(false);
		this.emptyAnnounmentRef = createElementRef();
		this.projects = AppContext.get("projects");
		
	}
	
	onChange(data) {
		console.log(this.id)
		return <li onClick={()=> this.app.router.redirect(`/project/view/${data.id}/overview`)} class="list-item justify-start" style="gap:10px">
                   <i class="material-icons">inventory_2</i> {data.name}
           </li>
		
	}
	async onRender() {
		try {
			await CryzenousProjectManagerService.fetch();
		} catch (err) {
			ToastGenerator.show("Cannot load data !", {
				type: "danger"
			})
		}
		
		this.isDataLoaded.set(true);
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

        <div class="container" style="margin-top:5rem">
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
              syncArray(this.projects,this.onChange.bind(this))
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
          class="fab material-icons" 
          onClick={() => this.app.router.redirect("/project/create")}
        >
          add
        </button> 
      </>
		);
	}
}
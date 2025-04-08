import { RumiousComponent } from 'rumious';
import {AppContext} from '../contexts/app.js';

export class Navbar extends RumiousComponent {
  static tag = "cryzenous-navbar";
  
	onCreate(){
		this.isShowNavbar = AppContext.get("isEditMode");
	}
	
  template() {
    return(
      <>
        <div bind:hide="$isShowNavbar" class="navbar navbar-shadow" style="z-index:1000">
          <div class="navbar-header">
            <button class="navbar-btn material-icons">menu</button>
            <h3 class="">Cryzenous</h3>
          </div>
        </div>
      </>
    );
  }
}
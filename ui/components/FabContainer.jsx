import { RumiousComponent } from 'rumious';
import {AppContext} from '../contexts/app.js';



export class FabContainer extends RumiousComponent {
	
	onCreate() {
	  AppContext.get("isEditMode").set(true);
		this.fabs = this.props.fabs;
	}
	
	onDestroy(){
		AppContext.get("isEditMode").set(false);
	}
	
	template() {
		return (
			<div  >
        {this.fabs.map((fab, i) => (
          <button
          	class="material-icons fab"
          	style={`bottom:${60*(i+1)}px`}
            onClick={() => fab.onClick()}
          >
            {fab.icon}
          </button>
        ))}
      </div>
		);
	}
}
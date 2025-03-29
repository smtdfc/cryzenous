import { RumiousComponent } from 'rumious';

export class FlowActionButtonGroup extends RumiousComponent {
  static tag = "cryzenous-btn-group";
  
  template() {
    const { actions = [] } = this.props;
    
    return (
      <> 
        {actions.map(({ callback, icon }) => (
          <button 
            class="cryzenous-btn cryzenous-btn-icon material-icons" 
            onclick={() => callback?.()}
          >
            {icon}
          </button>
        ))}
      </>
    );
  }
  
  handleAction(actionName) {
    console.log(`Action triggered: ${actionName}`);
  }
}
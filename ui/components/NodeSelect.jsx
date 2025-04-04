import { RumiousComponent, createElementRef } from 'rumious';
import { RumiousUIOffcanvas } from 'rumious-ui';
import {Modules} from '../data/modules.js';


export class NodeSelect extends RumiousComponent {
  static tag = "cryzenous-node-select";
  
  onCreate() {
    this.offcanvasRef = createElementRef();
    this.context = this.props.context;
    this.context.on("node:select", () => new RumiousUIOffcanvas(this.offcanvasRef.target).open());
    
    this.modules = Modules;
  }
  
  template() {
    return (
      <>
        <div class="offcanvas" id="node-selector" ref="$offcanvasRef">
          <div class="offcanvas-header">
            <h4 class="offcanvas-title">Select Node</h4>
            <button class="offcanvas-btn material-icons" data-ui="toggle:offcanvas:#node-selector">close</button>
          </div>
          <div class="offcanvas-body">
            {Object.entries(this.modules).map(([name, module]) => (
              <details class="treeview">
                <summary>{name}</summary>
                <ul>
                  {module.map(node => (
                    <li data-ui="toggle:offcanvas:#node-selector" onClick={()=> this.context.emit("node:selected",node)}>{node.name}</li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </>
    );
  }
}
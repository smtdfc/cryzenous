import { RumiousComponent } from 'rumious';
import { Modules } from '../data/modules.js';

export class NodeSelectorComponent extends RumiousComponent {
  static tag = "cryzenous-node-selector";
  
  onCreate() {
    this.context = this.props.context;
    this.currentFlowID = null;
  }
  
  onRender() {
    this.context.on("node:select", ({ flowID }) => {
      this.currentFlowID = flowID;
      this.open();
    })
  }
  
  close() {
    this.element.classList.remove("open");
  }
  
  open() {
    this.element.classList.add("open");
  }
  
  onSelectNode(module, name, declaration) {
    this.close();
    this.context.emit("node:create",{
      target:this.currentFlowID,
      object:{
        module,
        name,
        declaration
      }
    });
  }
  
  renderModuleTree() {
    return Object.entries(Modules).map(([moduleName, nodes]) => (
      <details class="cryzenous-tree" key={moduleName}>
        <summary style="display:flex; align-items: center; column-gap:10px">
          <i class="material-icons">token</i>{moduleName}
        </summary>
        <div class="cryzenous-tree-items">
          {Object.keys(nodes).map((nodeName) => (
            <span onClick={()=>this.onSelectNode(moduleName,nodeName,nodes[nodeName])} key={nodeName}>{nodeName}</span>
          ))}
        </div>
      </details>
    ));
  }
  
  template() {
    return (
      <>
        <div class="cryzenous-header">
          <h3>Node Selection</h3>
          <button 
            class="cryzenous-btn cryzenous-btn-icon cryzenous-btn-md material-icons"
            onClick={() => this.close()}
          >
            close
          </button>
        </div>
        <div class="cryzenous-tree-container">
          {this.renderModuleTree()}
        </div>
      </>
    );
  }
}
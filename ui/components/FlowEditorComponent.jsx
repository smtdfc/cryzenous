import { RumiousComponent, createContext } from 'rumious';
import { FlowComponent } from './FlowComponent.jsx';
import { FlowActionButtonGroup } from './FlowActionButtonGroup.jsx';
import { NodeSelectorComponent } from './NodeSelectorComponent.jsx';
import { CryzenousFlowSearch } from '../helpers/flowSearch.js';
import { CryzenousNodeGenerator } from '../helpers/nodeGenerator.js';

export class FlowEditorComponent extends RumiousComponent {
  static tag = "cryzenous-flow-editor";
  
  onCreate() {
    this.modules = this.props.modules;
    this.rootFlow = this.props.flow;
    this.flowSearch = new CryzenousFlowSearch(this.rootFlow);
    this.context = createContext(Date.now().toString(32), {
      rootFlow: this.rootFlow,
      flowSearch: this.flowSearch
    });
    
  }
  
  onRender() {
    this.context.on("warn", (data) => {
      console.warn(data);
    });
    
    this.context.on("node:create", (data) => {
      let flow = this.flowSearch.findFlowById(data.target);
      let newNode = CryzenousNodeGenerator.generateFromDeclaration(
        data.object.module,
        data.object.declaration
      );
      
      flow.addNode(newNode);
    });
    
  }
  
  onAddBtnClick() {
    this.context.emit("node:select", {
      flowID: this.rootFlow.flowID
    })
  }
  
  template() {
    const { flow } = this.props;
    
    return (
      <>
        <div class="container">
          <FlowComponent context={this.context} flow={flow} />
          <FlowActionButtonGroup 
            actions={[
              { icon: "refresh" },
              { icon: "add", callback:()=>this.onAddBtnClick()},
              { icon: "play_arrow" }
            ]}
          />
        </div>
        <NodeSelectorComponent 
          context={this.context}
          modules={this.modules}
        />
      </>
    );
  }
}
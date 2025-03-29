import { RumiousComponent } from 'rumious';
import { FlowComponent } from './FlowComponent.jsx';

export class NodeArgComponent extends RumiousComponent {
  static tag = "cryzenous-node-arg";
  
  onCreate() {
    this.context = this.props.context;
    this.arg = this.props.arg;
  }
  
  onNodeValueClick({ target }) {
    target.contentEditable = true;
  }
  
  onAddBtnClick() {
    this.context.emit("node:select", {
      flowID: this.arg.flow.flowID
    })
  }
  
  template() {
    const { name, value, flow, state } = this.arg;
    const placeholder = flow && state !== "ONLY_VALUE" ?
      <FlowComponent context={this.context} flow={flow} /> :
      null;
    
    return (
      <>
        <label class="node-arg-name" style="display:flex; align-items:center;">
          {name}
          {state !== "ONLY_VALUE" ? (
            <button onClick={()=>this.onAddBtnClick()}  class="cryzenous-btn cryzenous-btn-icon material-icons cryzenous-btn-sm" style="margin-left:auto">add</button>
          ):"" }
        </label>
        <span class="node-arg-value" on:click="onNodeValueClick">{value}</span>
        {placeholder}
      </>
    );
  }
}
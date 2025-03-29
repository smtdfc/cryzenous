import { RumiousComponent, createContext } from 'rumious';
import { NodeHeaderComponent } from './NodeHeaderComponent.jsx';
import { NodeBodyComponent } from './NodeBodyComponent.jsx';
import { Modules } from '../data/modules.js';

export class NodeComponent extends RumiousComponent {
  static tag = "cryzenous-node";
  
  onCreate() {
    this.controlContext = createContext(Date.now());
    this.context = this.props.context;
    this.node = this.props.node;
    this.flow = this.props.flow;
  }
  
  checkAvailable() {
    if (!Modules[this.node.module]) {
      this.controlContext.emit("state", "ERROR");
      this.context.emit("warn", `Module ${this.node.module} is not defined!`);
    } else if (!Modules[this.node.module][this.node.name]) {
      this.controlContext.emit("state", "ERROR");
      this.context.emit("warn", `The module ${this.node.module}.${this.node.name} is not defined!`);
    }
  }
  
  onRender() {
    this.checkAvailable();
  }
  
  template() {
    const { name, module, args } = this.node;
    return (
      <>
        <NodeHeaderComponent 
          controller={this.controlContext}
          node={this.node} 
          context={this.context}
          title={name} 
          subtitle={module}
        />
        <NodeBodyComponent 
          node={this.node} 
          context={this.context} 
          args={args} 
        />
      </>
    );
  }
}
import { CryzenousFlow } from './CryzenousFlow.js';
import { CryzenousNode } from './CryzenousNode.js';

export class CryzenousNodeArgument {
  constructor(name, value, flow = null, state = 'ONLY_VALUE') {
    this.name = name;
    this.value = value;
    this.flow = flow;
    this.state = state;
  }
  
  toJSON() {
    return {
      name: this.name,
      value: this.value,
      flow: this.flow ? this.flow.toJSON() : null,
      state: this.state,
    };
  }
  
  static fromJSON(data) {
    const nodes = data.flow ? data.flow.nodes.map(f => CryzenousNode.fromJSON(f)) : [];
    return new CryzenousNodeArgument(data.name, data.value, new CryzenousFlow(nodes), data.state);
  }
}
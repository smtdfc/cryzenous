import { CryzenousFlow } from '../models/CryzenousFlow.js';

export class CryzenousFlowSearch {
  constructor(flow) {
    this.flowMap = new Map();
    this._indexFlow(flow);
  }
  
  _indexFlow(flow) {
    const stack = [flow];
    this.flowMap.set(flow.flowID, flow); 
    
    while (stack.length > 0) {
      const currentFlow = stack.pop();
      for (const node of currentFlow.nodes) {
        for (const arg of node.args) {
          if (arg.type !== "ONLY_VALUE" && arg.flow instanceof CryzenousFlow) {
            this.flowMap.set(arg.flow.flowID, arg.flow);
            stack.push(arg.flow);
          }
        }
      }
    }
  }
  
  findFlowById(id) {
    return this.flowMap.get(id) || null;
  }
}
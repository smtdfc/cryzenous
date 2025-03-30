import { CryzenousNode } from './CryzenousNode.js';
import { generateId } from '@utils/id.js';
import {EventChannel} from '@utils/event.js';

export class CryzenousFlow {
  constructor(nodes = [], flowID = generateId()) {
    this.nodes = nodes;
    this.flowID = flowID;
    this.event= new EventChannel();
  }
  
  addNode(node){
    this.nodes.push(node);
    this.event.emit('node:add',node);
  }
  
  toJSON() {
    return {
      id: this.flowID,
      nodes: this.nodes.map(item => (item instanceof CryzenousNode ? item.toJSON() : item)),
    };
  }
  
  static fromJSON(data) {
    const nodes = data.nodes ? data.nodes.map(item => CryzenousNode.fromJSON(item)) : [];
    const flowID = data.id || generateId(); 
    return new CryzenousFlow(nodes, flowID);
  }
}
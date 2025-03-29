import { CryzenousNodeArgument } from './CryzenousNodeArgument.js';
import { generateId } from '../utils/id.js';

export class CryzenousNode {
  constructor(name, module = 'global', args = [],nodeID=generateId()) {
    this.name = name;
    this.module = module;
    this.args = args;
    this.nodeID=nodeID;
  }
  
  toJSON() {
    return {
      id:this.nodeID,
      name: this.name,
      module: this.module,
      args: this.args.map(arg => arg instanceof CryzenousNodeArgument ? arg.toJSON() : arg),
    };
  }
  
  static fromJSON(data) {
    const args = data.args ? data.args.map(arg => CryzenousNodeArgument.fromJSON(arg)) : [];
    return new CryzenousNode(data.name, data.module, args,data.id);
  }
}
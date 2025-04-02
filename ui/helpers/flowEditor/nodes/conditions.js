export class CryzenousConditionNode {
  constructor(context, args = {}, pos = {}) {
    this.editor = context.editor;
    this.args = {
      expression: args.expression ?? ""
    };
    
    this.id = this.editor.addNode("condition_node", 1, 2, pos.x ?? 0, pos.y ?? 0, 'node', {}, `
            <div class="node-header">
              <h4 class="node-title">Conditions</h4>
              <p class="node-subtitle">Core.Flows</p>
            </div>
            <div class="node-body">
              <div class="node-arg">
                <span class="node-arg-name" >Conditions:</span>
                <span class="node-arg-value" >${this.args.expression}</span>
              </div>
            </div>
        `);
    
    this.node = this.editor.getNodeFromId(this.id);
    this.gates = {
      "output_1": [],
      "output_2": [],
    };
    
    this.context = context;
    this.context.nodes[this.id] = this;
  }
  
  static generate(context, obj) {
    let node = new CryzenousConditionNode(
      context,
      obj.args,
      obj.pos
    );
    node.gates = obj.gates;
    return node;
  }
  
  getObject() {
    return {
      type: "CryzenousConditionNode",
      pos: {
        x: this.node.pos_x,
        y: this.node.pos_y
      },
      id: this.id,
      args: this.args,
      gates: this.gates,
    }
  }
}
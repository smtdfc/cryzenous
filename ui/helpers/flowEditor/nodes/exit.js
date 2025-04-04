export class CryzenousExitNode {
  constructor(editor, args = {}, pos = {}) {
    this.drawflow = editor.drawflow;
    this.editor = editor;
    this.args = {};
    
    this.id = this.drawflow.addNode("exit_node", 1, 0, pos.x ?? 0, pos.y ?? 0, 'node', {}, `
            <div class="node-header">
              <h4 class="node-title">Exit</h4>
              <p class="node-subtitle">Core.Flows</p>
            </div>
     `);
    
    this.node = this.drawflow.getNodeFromId(this.id);
    this.gates = {};
    this.editor.nodes[this.id] = this;
  }
  
  static generate(editor, obj) {
    let node = new CryzenousExitNode(
      editor,
      obj.args,
      obj.pos
    );
    
    return node;
  }
  
  getObject() {
    return {
      type: "CryzenousExitNode",
      pos: {
        x: this.node.pos_x,
        y: this.node.pos_y
      },
      id: this.id,
      args: this.args,
      connects: {},
    }
  }
}
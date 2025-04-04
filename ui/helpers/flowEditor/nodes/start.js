export class CryzenousStartNode {
  constructor(editor, args = {}, pos = {}) {
    this.drawflow = editor.drawflow;
    this.editor = editor;
    this.args = {};
    
    this.id = this.drawflow.addNode("start_node", 0, 1, pos.x ?? 0, pos.y ?? 0, 'node', {}, `
            <div class="node-header">
              <h4 class="node-title">Start</h4>
              <p class="node-subtitle">Core.Flows</p>
            </div>
     `);
    
    this.node = this.drawflow.getNodeFromId(this.id);
    this.gates = {
      "output_1": [],
    };
    
    
    this.editor.nodes[this.id] = this;
  }
  
  static generate(editor, obj) {
    let node = new CryzenousStartNode(
      editor,
      obj.args,
      obj.pos
    );
    
    node.gates = {
      'output_1': obj.connects.next ?? [],
    };
    
    return node;
  }
  
  getObject() {
    return {
      type: "CryzenousStartNode",
      pos: {
        x: this.node.pos_x,
        y: this.node.pos_y
      },
      id: this.id,
      args: this.args,
      connects: {
        "next": this.gates['output_1'],
      },
    }
  }
}
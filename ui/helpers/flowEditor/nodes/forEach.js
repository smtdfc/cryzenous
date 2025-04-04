export class CryzenousForEachNode {
  constructor(editor, args = {}, pos = {}) {
    this.drawflow = editor.drawflow;
    this.editor = editor;
    this.args = {
      index: args.index ?? "",
      list: args.start ?? "",
    };
    
    this.id = this.drawflow.addNode("for_each_node", 1, 2, pos.x ?? 0, pos.y ?? 0, 'node', {}, `
            <div class="node-header">
              <h4 class="node-title">For Each</h4>
              <p class="node-subtitle">Core.Flows</p>
            </div>
            <div class="node-body">
              <div class="node-arg">
                <span class="node-arg-name">Index:</span>
                <span class="node-arg-value" contenteditable="true" >${this.args.index}</span>
              </div>
              <div class="node-arg">
                <span class="node-arg-name">List:</span>
                <span class="node-arg-value" contenteditable="true"  >${this.args.list}</span>
              </div>
              <br/>
            </div>
     `);
    
    this.node = this.drawflow.getNodeFromId(this.id);
    this.gates = {
      "output_1": [],
      "output_2": [],
    };
    
    
    this.editor.nodes[this.id] = this;
  }
  
  static generate(editor, obj) {
    let node = new CryzenousForEachNode(
      editor,
      obj.args,
      obj.pos
    );
    
    node.gates = {
      'output_1': obj.connects.next ?? [],
      'output_2': obj.connects.body ?? []
    };
    
    return node;
  }
  
  getObject() {
    return {
      type: "CryzenousForEachNode",
      pos: {
        x: this.node.pos_x,
        y: this.node.pos_y
      },
      id: this.id,
      args: this.args,
      connects: {
        "next": this.gates['output_1'],
        "body": this.gates['output_2'],
      },
    }
  }
}
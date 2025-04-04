export class CryzenousEventNode {
  constructor(editor, args = {}, pos = {}) {
    this.drawflow = editor.drawflow;
    this.editor = editor;
    this.args = {
      name: args.name ?? ''
    };
    
    this.id = this.drawflow.addNode('event_node', 0, 1, pos.x ?? 0, pos.y ?? 0, 'node', {}, `
            <div class="node-header">
              <h4 class="node-title">Event Trigger</h4>
              <p class="node-subtitle">Core.Flows</p>
            </div>
            <div class="node-body">
              <div class="node-arg">
                <span class="node-arg-name" >Event name:</span>
                <span class="node-arg-value" contenteditable="true"  >${this.args.name}</span>
              </div>
            </div>
     `);
    
    this.node = this.drawflow.getNodeFromId(this.id);
    this.gates = {
      'output_1': [],
    };
    
    
    this.editor.nodes[this.id] = this;
  }
  
  static generate(editor, obj) {
    let node = new CryzenousEventNode(
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
      type: 'CryzenousEventNode',
      pos: {
        x: this.node.pos_x,
        y: this.node.pos_y
      },
      id: this.id,
      args: this.args,
      connects: {
        'next': this.gates['output_1'],
      },
    };
  }
}
export class CryzenousForLoopNode {
  constructor(editor, args = {}, pos = {}) {
    this.drawflow = editor.drawflow;
    this.editor = editor;
    this.args = {
      counter: args.counter ?? '',
      start: args.start ?? '',
      end: args.end ?? ''
    };
    
    this.id = this.drawflow.addNode('for_loop_node', 1, 2, pos.x ?? 0, pos.y ?? 0, 'node', {}, `
            <div class="node-header">
              <h4 class="node-title">For Loop</h4>
              <p class="node-subtitle">Core.Flows</p>
            </div>
            <div class="node-body">
              <div class="node-arg">
                <span class="node-arg-name">Counter:</span>
                <span class="node-arg-value" contenteditable="true" >${this.args.counter}</span>
              </div>
              <div class="node-arg">
                <span class="node-arg-name">Start Value:</span>
                <span class="node-arg-value" contenteditable="true"  >${this.args.start}</span>
              </div>
              <div class="node-arg">
                <span class="node-arg-name">End Value:</span>
                <span class="node-arg-value" contenteditable="true" >${this.args.end}</span>
              </div>
              <br/>
            </div>
     `);
    
    this.node = this.drawflow.getNodeFromId(this.id);
    this.gates = {
      'output_1': [],
      'output_2': [],
    };
    
    
    this.editor.nodes[this.id] = this;
  }
  
  static generate(editor, obj) {
    let node = new CryzenousForLoopNode(
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
      type: 'CryzenousForLoopNode',
      pos: {
        x: this.node.pos_x,
        y: this.node.pos_y
      },
      id: this.id,
      args: this.args,
      connects: {
        'next': this.gates['output_1'],
        'body': this.gates['output_2'],
      },
    };
  }
}
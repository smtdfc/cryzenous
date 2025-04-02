export class CryzenousFunctionNode {
  constructor(editor, functionName = "", moduleName = "", args = {}, pos = {}) {
    this.drawflow = editor.drawflow;
    this.functionName = functionName;
    this.moduleName = moduleName;
    this.editor = editor;
    this.args = {};
    
    this.id = this.drawflow.addNode("function_node", 1, 1, pos.x ?? 0, pos.y ?? 0, 'node', {}, `
        <div class="node-header">
          <h4 class="node-title">${this.functionName}</h4>
          <p class="node-subtitle">${this.moduleName}</p>
        </div>
        <div class="node-body">
          ${Object.keys(args)
            .map(
              (argName) => `
                <div class="node-arg">
                  <span class="node-arg-name">${argName}:</span>
                  <span class="node-arg-value">${this.args[argName]}</span>
                </div>
                `
             )
             .join("")
          }
        </div>
     `);
    
    this.node = this.drawflow.getNodeFromId(this.id);
    this.gates = {
      "output_1": [],
    };
    
    this.editor.nodes[this.id] = this;
  }
  
  static generate(editor, obj) {
    let node = new CryzenousFunctionNode(
      editor,
      obj.name,
      obj.module,
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
      type: "CryzenousFunctionNode",
      name: this.functionName,
      module: this.moduleName,
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



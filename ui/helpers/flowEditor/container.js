import Drawflow from 'drawflow';

export class CryzenousFlowEditContainer {
  constructor(container) {
    this.nodes = {};
    this.editor = new Drawflow(container);
    this.editor.start();
    this.editor.zoom_enable = true;
    
    this.editor.on('connectionCreated', (data) => {
      let inputNodeID = data.input_id;
      let outputNodeID = data.output_id;
      let inputGateName = data.input_class;
      let ouputGateName = data.output_class;
      let sourceNode = this.nodes[outputNodeID];
      sourceNode.gates[ouputGateName].push(inputNodeID);
    });
    
    this.editor.on('connectionRemoved', (data) => {
      let inputNodeID = data.input_id;
      let outputNodeID = data.output_id;
      let inputGateName = data.input_class;
      let ouputGateName = data.output_class;
      let sourceNode = this.nodes[outputNodeID];
      sourceNode.gates[ouputGateName] = sourceNode.gates[ouputGateName].filter(value => value !== inputNodeID);
    });
    
    this.editor.on("nodeRemoved", (id) => {
      delete this.nodes[id];
    });
  }
  
  getObject() {
    let nodes = []
    for (let id in this.nodes) {
      let node = this.nodes[id];
      nodes.push(node.getObject())
    }
  }
  
}
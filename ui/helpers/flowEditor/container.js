import Drawflow from 'drawflow';

export class CryzenousFlowEditContainer {
  constructor(container, context) {
    this.context = context;
    this.nodes = {};
    this.drawflow = new Drawflow(container);
    this.drawflow.start();
    this.drawflow.zoom_enable = true;
    this.drawflow.useuuid = true;
    
    this.drawflow.on('connectionCreated', (data) => {
      let inputNodeID = data.input_id;
      let outputNodeID = data.output_id;
      let ouputGateName = data.output_class;
      let sourceNode = this.nodes[outputNodeID];
      sourceNode.gates[ouputGateName].push(inputNodeID);
    });
    
    this.drawflow.on('connectionRemoved', (data) => {
      let inputNodeID = data.input_id;
      let outputNodeID = data.output_id;
      let ouputGateName = data.output_class;
      let sourceNode = this.nodes[outputNodeID];
      sourceNode.gates[ouputGateName] = sourceNode.gates[ouputGateName].filter(value => value !== inputNodeID);
    });
    
    this.drawflow.on('nodeRemoved', (id) => {
      delete this.nodes[id];
    });
    
  }
  
  getObject() {
    let nodes = [];
    for (let id in this.nodes) {
      let node = this.nodes[id];
      nodes.push(node.getObject());
    }
  }
  
}
import { RumiousComponent } from 'rumious';
import { NodeComponent } from './NodeComponent.jsx';
import { ArrowComponent } from './ArrowComponent.jsx';

export class FlowComponent extends RumiousComponent {
  static tag = "cryzenous-flow";
  
  onCreate() {
    this.context = this.props.context;
    this.flow = this.props.flow;
    
    this.flow.event.on("node:add", (node) => {
      this.element.appendChild(this.render(
        <>
          {(this.flow.nodes.length-1) > 0 ? <ArrowComponent /> : <span />}
          <NodeComponent 
            flow={this.flow}
            context={this.context} 
            node={node} 
          />
        </>
      ));
    });
  }
  
  template() {
    const { flow } = this.props;
    return (
      <>
        {flow.nodes.map((item, index) => (
          <>
            {index > 0 ? <ArrowComponent /> : <span />}
            <NodeComponent 
              flow={this.flow}
              context={this.context} 
              key={index} 
              node={item} 
            />
          </>
        ))}
      </>
    );
  }
}
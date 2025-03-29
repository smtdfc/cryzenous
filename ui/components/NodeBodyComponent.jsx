import { RumiousComponent } from 'rumious';
import { NodeArgComponent } from './NodeArgComponent.jsx';

export class NodeBodyComponent extends RumiousComponent {
  static tag = "cryzenous-node-body";
  
  onCreate() {
    this.context = this.props.context;
    this.node = this.props.node;
  }
  
  template() {
    const { args } = this.props;
    return (
      <>
        {args.map((arg, index) => (
          <NodeArgComponent context={this.context} key={index} arg={arg} />
        ))}
      </>
    );
  }
}
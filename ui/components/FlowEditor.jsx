import { RumiousComponent, createElementRef } from 'rumious';
import {CryzenousFlowEditContainer} from '@helpers/flowEditor/container.js';
import 'drawflow/dist/drawflow.min.css';


export class FlowEditor extends RumiousComponent {
  static tag = "cryzenous-flow-editor";
  
  onCreate() {
    this.flowEditContainer = createElementRef()
  }
  
  onRender() {
    this.flowEdit = new CryzenousFlowEditContainer(this.flowEditContainer.target);
  }
  
  template() {
    return (
      <>
        <div class="flow-edit-container" ref="$flowEditContainer"></div>
      </>
    );
  }
}
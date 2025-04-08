import { RumiousComponent, createElementRef, createContext } from 'rumious';
import { CryzenousFlowEditContainer } from '@helpers/flowEditor/container.js';
import { NodeSelect } from './NodeSelect.jsx';
import {FabContainer} from './FabContainer.jsx';

export class FlowEditor extends RumiousComponent {
	static tag = "cryzenous-flow-editor";
	
	onCreate() {
		this.flowEditContainerRef = createElementRef();
		this.context = createContext();
		this.context.on("node:selected", ({ base }) => {
			new base(this.flowEdit, {}, { x: 100, y: 100 });
		})
	}
	
	onRender() {
		this.flowEdit = new CryzenousFlowEditContainer(this.flowEditContainerRef.target);
	}
	
	template() {
		return (
			<>
        <div class="flow-edit-container" ref="$flowEditContainerRef"></div>
				<FabContainer
					fabs={[
						{icon:"add",onClick:()=> this.context.emit("node:select")},
						{icon:"save",onClick:()=> this.context.emit("node:select")},
					]}
				/>
        <NodeSelect context={this.context} />
      </>
		);
	}
}
import { RumiousComponent, createElementRef } from 'rumious';
import { FlowEditor } from '@components/FlowEditor.jsx';

export class Page extends RumiousComponent {
	static tag = "cryzenous-page-edit-task";
	
	onCreate() {
		this.flowEditContainerRef = createElementRef();
		this.router = this.props.router;
		this.currentTaskID = this.router.params.task_id;
		this.currentProjectID = this.router.params.project_id;
	}
	
	template() {
		return (
			<>
				<FlowEditor/>
      </>
		);
	}
}
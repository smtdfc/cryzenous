import { RumiousComponent, createElementRef, createState } from 'rumious';
import { CryzenousProjectManagerService } from '@services/projects.js';

export class Page extends RumiousComponent {
  static tag = "cryzenous-project-deployment-page";
  template() {
    return (
      <>
        <h3>Deployment</h3>
        <div class="" style="min-height:200vh">
        </div>
      </>
    );
  }
}
import { RumiousComponent } from 'rumious';

export class ArrowComponent extends RumiousComponent {
  static tag = "cryzenous-arrow";
  
  template() {
    return <span class="material-icons arrow">arrow_downward</span>;
  }
}
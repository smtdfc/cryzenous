import { RumiousComponent } from 'rumious';

export class Navbar extends RumiousComponent {
  static tag = "cryzenous-navbar";
  
  template() {
    return(
      <>
        <div class="cryzenous-navbar-header">
          <h3 class="cryzenous-navbar-title">Cryzenous</h3>
        </div>
      </>
    );
  }
}
import { RumiousComponent } from 'rumious';

export class Navbar extends RumiousComponent {
  static tag = "cryzenous-navbar";
  
  template() {
    return(
      <>
        <div class="navbar" style="z-index:1000">
          <div class="navbar-header">
            <h3 class="">Cryzenous</h3>
          </div>
        </div>
      </>
    );
  }
}
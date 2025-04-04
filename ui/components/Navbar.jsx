import { RumiousComponent } from 'rumious';

export class Navbar extends RumiousComponent {
  static tag = "cryzenous-navbar";
  
  template() {
    return(
      <>
        <div class="navbar navbar-shadow" style="z-index:1000">
          <div class="navbar-header">
            <button class="navbar-btn material-icons">menu</button>
            <h3 class="">Cryzenous</h3>
          </div>
        </div>
      </>
    );
  }
}
import { RumiousApp } from 'rumious';
import { Navbar } from './components/Navbar.jsx';
import initRouter from "./router/index.js";
import { RumiousUIModule } from 'rumious-ui';
import "./styles/main.css";
import "rumious-ui/dist/index.css";


const app = new RumiousApp(document.getElementById("root"));
app.ui = RumiousUIModule.init(app);
initRouter(app);
//<FlowEditorComponent modules={Modules} flow={new CryzenousFlow([])} />

app.render(
  <>
    <Navbar/>
    <div class="cryzenous-app-container">
      {app.router.rootInjector}
    </div>
  </>
);

app.router.start();
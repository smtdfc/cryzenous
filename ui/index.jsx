import { RumiousApp } from 'rumious';
import { Navbar } from './components/Navbar.jsx';
import initRouter from "./router/index.js";
import { RumiousUIModule } from 'rumious-ui';
import 'drawflow/dist/drawflow.min.css';
import "./styles/main.css";
import "rumious-ui/dist/index.css";
import {FlowEditor} from './components/FlowEditor.jsx';

const app = new RumiousApp(document.getElementById("root"));
app.ui = RumiousUIModule.init(app);
initRouter(app);
//<FlowEditorComponent modules={Modules} flow={new CryzenousFlow([])} />

app.render(
  <>
    <Navbar/>
    <FlowEditor />
  </>
);

//app.router.start();
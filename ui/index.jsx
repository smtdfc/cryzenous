import { RumiousApp } from 'rumious';
import { FlowEditorComponent } from './components/FlowEditorComponent.jsx';
import { Modules } from './data/modules.js';
import { CryzenousFlow } from './models/CryzenousFlow.js';
import "./styles/main.css";

const app = new RumiousApp(document.getElementById("root"));
app.render(<FlowEditorComponent modules={Modules} flow={new CryzenousFlow([])} />);
import {createContext,createArrayState} from 'rumious';

export const AppContext = createContext(Date.now(),{
  projects:createArrayState([]),
  tasks:{},
  deployments:{}
});
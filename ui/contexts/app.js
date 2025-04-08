import {createContext,createArrayState,createState} from 'rumious';

export const AppContext = createContext(Date.now(),{
  projects:createArrayState([]),
  tasks:{},
  deployments:{},
  isEditMode:createState(false)
});
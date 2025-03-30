import {createContext} from 'rumious';

export const AppContext = createContext(Date.now(),{
  projects:[]
})
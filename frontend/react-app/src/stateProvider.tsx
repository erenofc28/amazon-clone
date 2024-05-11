import {createContext,useContext,useReducer} from "react";
// import { initialState } from './reducer';



export const StateContext = createContext("");

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export const StateProvider = ({reducer, initialState, children }:{reducer:any; initialState:any; children:any;} ) => (
    <StateContext.Provider value ={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );

// eslint-disable-next-line react-refresh/only-export-components
export const useStateValue=()=> useContext(StateContext);
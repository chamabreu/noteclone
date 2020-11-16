/* Modules */
import { useReducer, createContext } from 'react';


/* Other */
import { appReducer, initialState } from './DispatchManager';


/* Export StateContext to access the app states */
export const StateContext = createContext(initialState)
/* Export DispatchContext to access the app functions (api-calls) */
export const DispatchContext = createContext()



/* This describes the StateManager used in the index.js to wrap around the whole App */
export default function StateManager(props) {

  /* create the global Dispatch reducer */
  const [state, dispatch] = useReducer(appReducer, initialState)


  /* Render the stuff */
  return (

    /* Wrap all in the DispatchContext to get access to functions */
    <DispatchContext.Provider value={dispatch}>

      {/* Wrap all in StateContext to get access to states */}
      <StateContext.Provider value={state}>

        {/* Render the children which gets passed by the parent caller -> index.js */}
        {props.children}


      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
/* Modules */
import { useReducer, createContext } from 'react';

/* Other */
import { allReducer } from './reducer';


const initialState = {
  /* Loading State for TopLevel App */
  mainPageLoading: false,


  /* authed is true if a user is logged in / browser sends cookie with serversession */
  authed: false,


  /* holds the user email adress */
  user: null,


  /* 
  NOTE#002
    holds the user data. For now, this gets ALL the Data from the database.
    Maybe this need to be splitted up, to accelerate the speed if large data is saved by user
   */
  data: null,


}

export const StateContext = createContext(initialState)
export const DispatchContext = createContext()



/* This describes the StateContext used in the index.js to wrap around the whole App */
export default function State(props) {

  /*
    set specific states - these get later updated and
    passed down to the context provider
   */
  const [state, dispatch] = useReducer(allReducer, initialState)

  /*
    useEffect gets only called once because of the [].
    It should getData on a reload or initial call of the App
  */
  // useEffect(() => {
  //   getData()
  // }, [])


  /* Render the stuff */
  return (

    <DispatchContext.Provider value={dispatch}>

      <StateContext.Provider value={state}>

        {/* Render the children which gets passed by the parent caller -> index.js */}
        {props.children}

      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
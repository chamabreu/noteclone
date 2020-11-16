/* MODULES */
import { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'



/* Components */
import MainView from './MainView/MainView'
import SideBar from './SideBar/SideBar'



/* Other */
import { StateContext, DispatchContext } from '../../Context/StateManager'



/* The "main" Component if a user is authed */
export default function Authed() {
  /* get global Contexts */
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)



  useEffect(() => {
    /*
      check if there is data in the StateContext.
      if not, get some
    */
    if (!globalState.data) {
      axios.post('/api/getData')

        /* On success set global state with data */
        .then(result => {
          globalDispatch({ type: "SET_DATA", payload: result.data })
        })


        /* On failure, make sure to reset the global state to "log the user out" */
        .catch(error => {
          globalDispatch({ type: "RESET" })
          console.log('error :>> ', error)
        })
    }
  }, [globalState.data, globalDispatch])



  /* Let the user "wait for data" if there is no data */
  if (!globalState.data) {
    return (
      null
      // <h1>Waiting for Data</h1>
    )

    
    /* the normal case, show the page */
  } else {
    return (
      <main>
        <Switch>

          {/* The "home" of the site */}
          <Route exact path="/">
            <SideBar />
            <MainView />
          </Route>


          {/* the specific page view */}
          <Route path="/:page">
            <SideBar />
            <MainView />
          </Route>


        </Switch>
      </main>
    )

  }

}


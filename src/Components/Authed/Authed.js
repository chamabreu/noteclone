/* MODULES */
import { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'



/* Components */
import MainView from './MainView/MainView'
import SideBar from './SideBar/SideBar'



/* Other */
import { StateContext, DispatchContext } from '../../Context/StateManager'
import axios from 'axios'


/* The "main" Component if a user is authed */
export default function Authed() {
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)


  /* Call this on every rerender. */
  useEffect(() => {
    /*
      Conditionally check if there is data in the StateContext.
      Normally there should NEVER be no data, but for exception just try to get some
    */
    if (!globalState.data) {
      axios.post('/api/getData')
        .then(result => {
          globalDispatch({ type: "SET_DATA", payload: result.data })
        })
        .catch(error => {
          globalDispatch({ type: "RESET" })
          console.log('error :>> ', error)
        })
    }
  }, [globalState.data, globalDispatch])


  /* Let the user "wait for data" if there (never should) is no data */
  if (!globalState.data) {
    return (
      <h1>Waiting for Data</h1>
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


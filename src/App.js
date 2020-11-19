/* Modules */
import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';



/* Components */
import Welcome from './Components/Public/Welcome';
import Login from './Components/Public/Login';
import Register from './Components/Public/Register';
import Authed from './Components/Authed/Authed';



/* Other */
import { DispatchContext, StateContext } from './Context/StateManager';
import { AUTHED } from './Context/DispatchManager'
import { API } from './Context/ApiCalls';




/* The main Component of the App */
export default function App() {
  /* local State */
  const [isLoading, setisLoading] = useState(true)

  /* get the global Contexts */
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)


  /* use an initial Call on App Render to check if user is logged in via cookie */
  useEffect(() => {
    API.authedStatus()
      .then(result => {

        /* If he is */
        if (result.status === 200) {
          /* Set global State to authed and set user state */
          globalDispatch({ type: AUTHED, payload: { user: result.data } })
          /* set local state */
          setisLoading(false)

          /* handle anything else */
        } else {
          setisLoading(false)
          throw new Error(result.status)
        }
      })

      /* Handle error */
      .catch(error => {
        setisLoading(false)
        console.log('error :>> ', error)
      })

  }, [globalDispatch])





  /* Render in dependency of the loading state */
  if (isLoading) {
    return (
      null
    )

    /* check if state is authenticated */
  } else if (globalState.authed) {
    return (
      /* 
        The Authed Component holds the "internal" or "private" Components.
        This can be only accessed if the state is authed
       */
      <Authed />
    )



    /* The "public view" of the App. */
  } else {
    return (
      <Switch>

        {/* Public routes */}
        <Route exact path='/' component={Welcome} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />


        {/* "No Found Page" */}
        <Route component={Login} />
      </Switch>
    );
  }
}
/* Modules */
import React, { useContext, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';



/* Components */
import Welcome from './Components/Public/Welcome';
import Login from './Components/Public/Login';
import Register from './Components/Public/Register';
import Authed from './Components/Authed/Authed';



/* Other */
import './AppStyle.css'
import { DispatchContext, StateContext } from './Context/StateManager';
import { apiGetData } from './Requests/ApiCalls'




/* The main Component of the App */
export default function App() {

  /* get the StateContext */
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)


  useEffect(() => {
    apiGetData(globalState.user)
      .then(result => {
        globalDispatch({ type: "SET_DATA", payload: { data: result.data, user: result.user } })
      })
      .catch(error => {
        globalDispatch({ type: "RESET" })
        console.log('error :>> ', error)
      })
  }, [])


  /* Render in dependency of the loading state */
  if (globalState.mainPageLoading) {
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
        <Route render={() => (<><h1>Not logged In</h1><Link to='/'>Welcome Page</Link></>)} />
      </Switch>
    );
  }
}
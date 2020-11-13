/* Modules */
import { createContext } from 'react'


/* The context for the state */
export default createContext({
  /* authed is true if a user is logged in / browser sends cookie with serversession */
  authed: false,

  
  /* holds the user email adress */
  user: null,
  
  
  /* 
  NOTE#002
    holds the user data. For now, this gets ALL the Data from the database.
    Maybe this need to be splitted up, to accelerate the speed if large data is saved by user
   */
  data: {},


  /* Functions that get filled by the StateManager */
  logIn: () => { },
  logOut: () => { },
  getData: () => { },
  updatePageName: () => { }
})

/* Modules */
import { useEffect, useState } from 'react';
import axios from 'axios';

/* Other */
import UserContext from './UserContext'

/* This describes the StateManager used in the index.js to wrap around the whole App */
export default function StateManager(props) {

  /*
    set specific states - these get later updated and
    passed down to the context provider
   */
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)


  /* the functions for the UserContext placeholders */

  /*
    Gets all the data from the API of a specific user.
    Which user knows the API from the Cookie the browser gets if a user logged in successfully.
  */
  const getData = () => {
    axios.post('/api/data')

      /* res holds in res.data the user data Look API for further information */
      .then(res => {
        /*
          Setting these states let the StateManager
          rerender all subcomponents with the new values
        */
        setLoading(false)
        setAuthed(true)
        setUser(res.data.user)
        setData(res.data.data)
      })

      /*
      NOTE#001
        Could be an error, safety reset the whole states.
        For now, just console log the error.
        Need more error handling features.
      */
      .catch(error => {
        setLoading(false)
        setAuthed(false)
        setUser(null)
        setData(null)
        console.log('error :>> ', error)
      })
  }


  /* NOTE#003 Maybe refactor all axios with a "global axios management" ? */
  const logIn = (user) => {
    /* NOTE#004 */
    /* setFunctions combine? with reducers? */

    /*
      Set authed to true and set user.
      The data will be filled on reload through useEffect
    */
    setAuthed(true)
    setUser(user)
  }


  /* Log a user out and initialize the state */
  const logOut = () => {
    axios.post('/api/logout')


      /* NOTE#004 Combine setStates*/
      .then(() => {
        setAuthed(false)
        setUser(null)
        setData(null)
      })



      .catch(error => {
        console.log('error :>> ', error);
      })
  }


  /* The page did get changed */
  const updatePageName = (pageID, newName) => {
    axios.post('/api/updatePageName', { pageID: pageID, newName: newName })

      /* On success, just call getData to be safe to have the server version */
      .then(getData)


      /* If there is a error, maybe undo the UI changes of the pagename? */
      .catch(err => console.log('err :>> ', err))
  }

  /*
    useEffect gets only called once because of the [].
    It should getData on a reload or initial call of the App
  */
  useEffect(() => {
    getData()
  }, [])


  /* Render the stuff */
  return (
    /* Set the userContext now with all states and functions available */
    <UserContext.Provider value={{
      loading: loading,
      authed: authed,
      user: user,
      data: data,
      getData: getData,
      updatePageName: updatePageName,
      logIn: logIn,
      logOut: logOut,

    }}>
      
      {/* Render the children which gets passed by the parent caller -> index.js */}
      {props.children}
    </UserContext.Provider>
  )
}
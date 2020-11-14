/* Const function names for handling typing errors */
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const SET_DATA = "SET_DATA"
export const UPDATE_PAGE_NAME = "UPDATE_PAGE_NAME"
export const RESET = "RESET"

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

export const allReducer = (state, action) => {
  switch (action.type) {

    /* LOG USER IN */
    case LOG_IN:
      console.log("LOG_IN ALLREDUCER")
      return {...state, authed: true, user: action.payload.user}


    /* -------------------------------- */
    /* LOG USER OUT */
    case LOG_OUT:
      console.log("LOG_OUT ALLREDUCER")
      return state


      // return logOut(state)



    /* -------------------------------- */
    /* GET DATA OF USER */
    case SET_DATA:
      console.log("SET_DATA ALLREDUCER")
      return {...state, authed: true, data: action.payload.data, user: action.payload.user}


      // return getData(state)
      // return {...state, data: {uno: "ist eins", dos: "ist 2"}}


    /* -------------------------------- */
    /* CHANGE A NAME OF A PAGE */
    case UPDATE_PAGE_NAME:
      console.log("UPDATE_PAGE_NAME ALLREDUCER")
      return state


      // return updatePageName(action.pageID, action.newName, state)



    /* -------------------------------- */
    /* CHANGE A NAME OF A PAGE */
    case RESET:
      console.log("RESET ALLREDUCER")
      return initialState


      // return updatePageName(action.pageID, action.newName, state)


    /* -------------------------------- */
    /* NO ACTiON MATCHES RETURN STATE */
    default:
      console.log("DEFAULT ALLREDUCER")
      return state
  }
}






// /* Log a user out and initialize the state */
// const logOut = async (state) => {

//   try {
//     await axios.post('/api/logout')
//     return { ...state, authed: false, user: null, data: null }



//   } catch (error) {
//     console.log('error :>> ', error);
//     return state
//   }

// }


// /* The page did get changed */
// const updatePageName = async (pageID, newName, state) => {

//   try {
//     /* NOTE#005 NEED TO RETURN THE NEW DATA TO GIVE IT TO THE STATE!!! */
//     await axios.post('/api/updatePageName', { pageID: pageID, newName: newName })
//     /* On success, just call getData to be safe to have the server version */
//     // getData()
//     return { ...state }


//   } catch (error) {
//     /* If there is a error, maybe undo the UI changes of the pagename? */
//     console.log('error :>> ', error)

//   }
// }
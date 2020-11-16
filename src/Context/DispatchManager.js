/* Const function names for handling typing errors */
export const AUTHED = "AUTHED"
export const LOG_OUT = "LOG_OUT"
export const SET_DATA = "SET_DATA"
export const NEW_PAGE = "NEW_PAGE"
export const NEW_SUBPAGE = "NEW_SUBPAGE"
export const REMOVE_PAGE = "REMOVE_PAGE"
export const UPDATE_PAGE_NAME = "UPDATE_PAGE_NAME"
export const RESET = "RESET"

const initialState = {

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



    /* AUTHED BY COOKIE */
    case AUTHED:
      console.log("AUTHED ALLREDUCER")
      return { ...state, authed: true, user: action.payload.user }



    /* -------------------------------- */
    /* LOG USER OUT */
    case LOG_OUT:
      console.log("LOG_OUT ALLREDUCER")
      return initialState





    /* -------------------------------- */
    /* CREATE NEW TOP PAGE */
    case NEW_PAGE:
      console.log("NEW_PAGE ALLREDUCER")
      return { ...state, data: action.payload.data }



    /* -------------------------------- */
    /* CREATE SUBPAGE */
    case NEW_SUBPAGE:
      console.log("NEW_SUBPAGE ALLREDUCER")
      return { ...state, data: action.payload.data }




    /* -------------------------------- */
    /* RENAME A PAGE */
    case UPDATE_PAGE_NAME:
      console.log("UPDATE_PAGE_NAME ALLREDUCER")
      return { ...state, data: action.payload.data }




    /* -------------------------------- */
    /* REMOVE A PAGE */
    case REMOVE_PAGE:
      console.log("REMOVE_PAGE ALLREDUCER")
      return { ...state, data: action.payload.data }



    /* -------------------------------- */
    /* GET DATA OF USER */
    case SET_DATA:
      console.log("SET_DATA ALLREDUCER")
      return { ...state, authed: true, data: action.payload.data, user: action.payload.user }




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


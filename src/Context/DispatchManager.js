/* Const function names for handling typing errors */
export const AUTHED = "AUTHED"
export const LOG_OUT = "LOG_OUT"
export const SET_DATA = "SET_DATA"
export const NEW_PAGE = "NEW_PAGE"
export const NEW_SUBPAGE = "NEW_SUBPAGE"
export const REMOVE_PAGE = "REMOVE_PAGE"
export const UPDATE_PAGE_NAME = "UPDATE_PAGE_NAME"
export const RESET = "RESET"


/*
  Initial State of the App.
  It's used to "reset" the app, if the user is logged out
*/
export const initialState = {

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


export const appReducer = (state, action) => {
  switch (action.type) {



    /* AUTHED BY COOKIE */
    case AUTHED:
      return { ...state, authed: true, user: action.payload.user }



    /* -------------------------------- */
    /* LOG USER OUT */
    case LOG_OUT:
      return initialState





    /* Fallthrough Switch. Maybe define later more details, for now just "update" the data. */
    /* -------------------------------- */
    /* CREATE NEW TOP PAGE */
    case NEW_PAGE: // Fallthrough


    /* -------------------------------- */
    /* CREATE SUBPAGE */
    case NEW_SUBPAGE: // Fallthrough


    /* -------------------------------- */
    /* RENAME A PAGE */
    case UPDATE_PAGE_NAME: // Fallthrough


    /* -------------------------------- */
    /* REMOVE A PAGE */
    case REMOVE_PAGE:
      return { ...state, data: action.payload.data }



    /* -------------------------------- */
    /* GET DATA OF USER */
    case SET_DATA:
      return { ...state, authed: true, data: action.payload.data, user: action.payload.user }




    /* -------------------------------- */
    /* CHANGE A NAME OF A PAGE */
    case RESET:
      return initialState


    /* -------------------------------- */
    /* NO ACTiON MATCHES RETURN STATE */
    default:
      return state
  }
}


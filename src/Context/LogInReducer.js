/* Specific reducer for Login.js */

export const LOGIN_ISLOADING = "LOGIN_ISLOADING"
export const LOGIN_FAILED = "LOGIN_FAILED"
export const LOGIN_EMAIL_INPUT = "LOGIN_EMAIL_INPUT"
export const LOGIN_PASSWORD_INPUT = "LOGIN_PASSWORD_INPUT"


export const loginReducer = (state, action) => {
  switch (action.type) {


    /* -------------------------------- */
    /* LOGIN is activated, set loading */
    case LOGIN_ISLOADING:
      return {
        ...state,
        isLoading: action.payload
      }


    /* -------------------------------- */
    /* log in failed, set loading and return error for UI */
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error.response.data
      }


    /* -------------------------------- */
    /* onChange of emailfield */
    case LOGIN_EMAIL_INPUT:
      return {
        ...state,
        email: action.payload.email
      }


    /* -------------------------------- */
    /* onChange of passwordField */
    case LOGIN_PASSWORD_INPUT:
      return {
        ...state,
        password: action.payload.password
      }

    default:
      return state
  }
}
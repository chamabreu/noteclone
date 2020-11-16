export const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoading: true
      }

    case "FAILED":
      return {
        ...state,
        isLoading: false,
        error: action.payload.error.response.data
      }

    case "EMAILINPUT":
      return {
        ...state,
        email: action.payload.email
      }

    case "PASSWORDINPUT":
      return {
        ...state,
        password: action.payload.password
      }

    default:
      return state
  }
}
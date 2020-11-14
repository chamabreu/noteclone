/* MODULES */
import { useReducer, useContext } from "react"
import { Link } from "react-router-dom"

/* Other */
import { DispatchContext, StateContext } from "../../Context/StateManager"
import { apiLogIn } from '../../Requests/ApiCalls'



const loginReducer = (state, action) => {
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

const initialState = {
  isLoading: false,
  error: "",
  email: "",
  password: ""
}

/* LOGIN PAGE */
/* JUST SIMPLE SETUP, NEEDS UI */
export default function Login() {
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  const [localState, dispatch] = useReducer(loginReducer, initialState)
  const { isLoading, error, email, password } = localState










  const login = async (event) => {
    event.preventDefault()

    try {
      let result = await apiLogIn(email, password)
      if (!result.error) {
        globalDispatch({ type: "LOG_IN", payload: {user: result.user} })
      } else {
        dispatch({ type: "FAILED", payload: { error: result.error } })
      }

    } catch (error) {
      dispatch({ type: "FAILED", payload: { error: error } })
    }

  }

  if (isLoading) {
    return (
      <h1>please wait...</h1>
    )
  } else {
    return (
      <div>
        <h1>Login Page.</h1>

        {globalState.authed ? "Authed" : "FAAAAAIL"}

        <hr></hr>

        <form onSubmit={login}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e) => dispatch({ type: "EMAILINPUT", payload: { email: e.target.value } })}
            value={email}>
          </input>


          <br></br>
          <br></br>

          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => dispatch({ type: "PASSWORDINPUT", payload: { password: e.target.value } })}
            value={password}>
          </input>


          <br></br>
          <br></br>

          <button type="submit">Login</button>
        </form>

        {error && <p>{error}</p>}

        <hr></hr>
        <hr></hr>

        <Link to='/'>Welcome Page</Link>
        <br></br>
        <Link to='/register'>Register</Link>

      </div>
    )

  }
}
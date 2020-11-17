/* MODULES */
import { useReducer, useContext } from "react"
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom"



/* Other */
import { DispatchContext } from "../../Context/StateManager"
import { loginReducer, LOGIN_FAILED, LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT, LOGIN_LOGIN } from '../../Context/LogInReducer'
import { AUTHED } from "../../Context/DispatchManager";
import { API } from "../../Context/ApiCalls";



/* LOGIN PAGE */
/* JUST SIMPLE SETUP, NEEDS UI */
export default function Login() {
  const history = useHistory()
  const pathUrl = useLocation().pathname


  /* GET GLOBAL CONTEXTS */
  const globalDispatch = useContext(DispatchContext)

  /* Set local state and reducer */
  const [localState, localDispatch] = useReducer(
    loginReducer,
    {
      isLoading: false,
      error: "",
      email: "",
      password: ""
    }
  )
  /* Destruct localState */
  const { isLoading, error, email, password } = localState



  /* pressed login */
  const logInPressed = async (event) => {
    event.preventDefault()

    /* Set local state */
    localDispatch({ type: LOGIN_LOGIN })

    /* call API */
    try {
      let result = await API.logIn(email, password)

      /* Handle result */
      if (result.status === 200) {
        /* Set Global state */
        globalDispatch({ type: AUTHED, payload: { user: result.user } })
        if (pathUrl === "/login") {
          history.push('/')
        }

        /* ?? NEED TO HANDLE THIS ?? */
      } else {
        /* Set local state with error */
        localDispatch({ type: LOGIN_FAILED, payload: { error: result.error } })
      }

      /* Catch errors */
    } catch (error) {
      /* Set local state with error */
      localDispatch({ type: LOGIN_FAILED, payload: { error: error } })
    }

  }

  /* If localstate say its loading */
  if (isLoading) {
    return (
      <h1>Logging in</h1>
    )

    /* else display Loginform */
  } else {
    return (
      <>
        <h1>Login Page.</h1>
        <hr></hr>

        <form onSubmit={logInPressed}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={(e) => localDispatch({ type: LOGIN_EMAIL_INPUT, payload: { email: e.target.value } })}
            value={email}
          />


          <br></br>
          <br></br>

          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => localDispatch({ type: LOGIN_PASSWORD_INPUT, payload: { password: e.target.value } })}
            value={password}
          />


          <br></br>
          <br></br>

          <button type="submit">Login</button>
        </form>

        {/* If a Error exists, failed credentials or server error, it gets display here */}
        {error && <p>{error}</p>}

        <hr></hr>
        <hr></hr>

        <Link to='/'>Welcome Page</Link>
        <br></br>
        <Link to='/register'>Register</Link>

      </>
    )

  }
}
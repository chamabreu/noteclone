/* MODULES */
import { useReducer, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';
/* Other */
import { DispatchContext, StateContext } from "../../Context/StateManager"
import { loginReducer } from '../../Context/LogInReducer'
import { AUTHED } from "../../Context/DispatchManager";


/* LOGIN PAGE */
/* JUST SIMPLE SETUP, NEEDS UI */
export default function Login() {
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  const [logInState, logInDisptach] = useReducer(
    loginReducer,
    {
      isLoading: false,
      error: "",
      email: "",
      password: ""
    }
  )
  const { isLoading, error, email, password } = logInState

  const history = useHistory()


  const login = async (event) => {
    event.preventDefault()

    try {
      let result = await axios.post(('/api/login'), { email: email, password: password })
      if (result.status === 200) {
        globalDispatch({ type: AUTHED, payload: { user: result.user } })
        history.push('/')
      } else {
        logInDisptach({ type: "FAILED", payload: { error: result.error } })
      }

    } catch (error) {
      logInDisptach({ type: "FAILED", payload: { error: error } })
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
            onChange={(e) => logInDisptach({ type: "EMAILINPUT", payload: { email: e.target.value } })}
            value={email}
          />


          <br></br>
          <br></br>

          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => logInDisptach({ type: "PASSWORDINPUT", payload: { password: e.target.value } })}
            value={password}
          />


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
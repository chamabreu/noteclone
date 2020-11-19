/* MODULES */
import { useReducer, useContext } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { Button, Form, Jumbotron } from 'react-bootstrap'



/* Other */
import { DispatchContext } from "../../Context/StateManager"
import { loginReducer, LOGIN_FAILED, LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT, LOGIN_ISLOADING } from '../../Context/LogInReducer'
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
    console.log("PRESSED")

    /* Set local state */
    localDispatch({ type: LOGIN_ISLOADING, payload: true })


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

  return (
    <>
      <Jumbotron>
        <h1>Login Page.</h1>

        <Link to='/'>
          <Button>
            Welcome Page
          </Button>
        </Link>


        <Link to='/register'>
          <Button>
            Register
          </Button>
        </Link>
      </Jumbotron>

      <Form onSubmit={logInPressed}>
        <Form.Group controlID="registerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => localDispatch({ type: LOGIN_EMAIL_INPUT, payload: { email: e.target.value } })}
          />
        </Form.Group>

        <Form.Group controlID="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => localDispatch({ type: LOGIN_PASSWORD_INPUT, payload: { password: e.target.value } })}
          />
        </Form.Group>

        <Button
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </Form>

      {/* If a Error exists, failed credentials or server error, it gets display here */}
      {error && <p>{error}</p>}

    </>
  )


}
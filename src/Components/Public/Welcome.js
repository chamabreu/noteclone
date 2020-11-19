/* MODULES */
import { useContext } from "react"
import { Button, Jumbotron } from "react-bootstrap"
import { Link } from "react-router-dom"

/* Other */
import { StateContext } from "../../Context/StateManager"


/* WELCOME PAGE / PUBLIC PAGE */
/* Client only gets here if he is not authed */
/* Just simple functions, no UI yet */
export default function Welcome() {
  const state = useContext(StateContext)


  return (
    <>
      <Jumbotron>
        {!state.authed
          /* This is the default output */
          ?
          <>
            <h1>Welcome.</h1>
          </>
          /* This line should never get executed, becaue client cant get here in authed state */
          : <h1>Welcome. You are logged in, {state.user}.</h1>
        }
      <Link to='/login'>
        <Button>
          Login
        </Button>
      </Link>

      <Link to='/register'>
        <Button>
          Register
        </Button>
      </Link>
      </Jumbotron>

    </>
  )
}
/* MODULES */
import { useContext } from "react"
import { Link } from "react-router-dom"

/* Other */
import { StateContext } from "../../Context/StateManager"


/* WELCOME PAGE / PUBLIC PAGE */
/* Client only gets here if he is not authed */
/* Just simple functions, no UI yet */
export default function Welcome() {
  const state = useContext(StateContext)


  return (
    <div>
      {!state.authed
        /* This is the default output */
        ? <h1>Welcome. Please log in.</h1>

        /* This line should never get executed, becaue client cant get here in authed state */
        : <h1>Welcome. You are logged in, {state.user}.</h1>
      }
      <hr></hr>
      <Link to='/login'>Login</Link>
      <br></br>
      <Link to='/register'>Register</Link>
    </div>
  )
}
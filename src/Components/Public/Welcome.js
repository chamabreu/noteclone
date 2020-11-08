import { useContext} from "react"
import { Link } from "react-router-dom"
import UserContext from "../../Context/UserContext"

export default function Welcome() {
  const userContext = useContext(UserContext)


  return (
    <div>
      {userContext.authed
        ? <h1>Welcome. You are logged in, {userContext.user}.</h1>
        : <h1>Welcome. Please log in.</h1>
      }
      <hr></hr>
      <Link to='/login'>Login</Link>
      <br></br>
      <Link to='/register'>Register</Link>
    </div>
  )
}
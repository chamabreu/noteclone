import { Link } from "react-router-dom"

export default function Welcome(props) {
  return(
    <div>
      <h1>Welcome. You are {props.authed}.</h1>
      <Link to='/login'>Login</Link>
      <br></br>
      <Link to='/register'>Register</Link>
    </div>
  )
}
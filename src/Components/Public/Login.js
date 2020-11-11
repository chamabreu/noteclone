import { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import UserContext from "../../Context/UserContext"
import axios from 'axios'


export default function Login() {
  const [error, setError] = useState(undefined)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const history = useHistory()
  const userContext = useContext(UserContext)

  const emailInput = (e) => {
    setEmail(e.target.value)
  }
  const passwordInput = (e) => {
    setPassword(e.target.value)
  }


  const login = (event) => {
    event.preventDefault()

    axios.post('/login', {
      email: email,
      password: password
    })
      .then(res => {
        switch (res.status) {
          case 200:
            console.log('res.status :>> ', res.status);
            userContext.logIn(email)
            history.push('/')
            break;
          case 401:
            setError(error.response.data)
            break;
          default:
            break;
        }
      })
      .catch(error => {
        setError(error.response.data)
      })
  }

  return (
    <div>
      <h1>Login Page.</h1>
      <span>You are {userContext.authed ? "Authed" : "Not Authed"}</span>

      <hr></hr>

      <form onSubmit={login}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          onChange={emailInput}
          value={email}>
        </input>


        <br></br>
        <br></br>

        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          onChange={passwordInput}
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
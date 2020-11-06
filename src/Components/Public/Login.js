import { useContext, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../../App"
import axios from 'axios'


export default function Login() {
  const [error, setError] = useState(undefined)
  const history = useHistory()
  const userContext = useContext(UserContext)


  const login = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    axios.post('/login', {
      email: email,
      password: password
    })
      .then(res => {
        switch (res.status) {
          case 200:
            userContext.logIn()
            history.push('/')
            break;
          case 401:
            console.log("Not valid credentials")
            setError(error.response.data)
            break;
          default:
            break;
        }
        // console.log('res :>> ', res);
      })
      .catch(error => {
        setError(error.response.data)
      })
  }

  return (
    <div>
      <h1>Login Page.</h1>
      <span>You are {userContext.authed ? "Authed" : "Not Authed"}</span>
      <br></br>
      <Link to='/'>Welcome Page</Link>
      <br></br>
      <Link to='/register'>Register</Link>

      <form onSubmit={login}>
        <input type="text" name="email" id="email" placeholder="email"></input>
        <br></br>
        <br></br>
        <input type="text" name="password" id="password" placeholder="password"></input>
        <br></br>
        <br></br>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}

    </div>
  )
}
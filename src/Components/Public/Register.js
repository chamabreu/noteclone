/* MODULES */
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"


/* Other */
import { API } from "../../Context/ApiCalls"


/* REGISTER PAGE */
/* JUST SIMPLE SETUP, NEEDS UI */
export default function Register() {
  const history = useHistory()

  /* Set local states, could also implement reducer like in Login? */
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  /* Client pressed register */
  const registerPressed = async (event) => {
    event.preventDefault()

    /* call API */
    try {
      let result = await API.register(email, password)

      /* Handle result */
      if (result.status === 200) {
        /* Push to Login Page */
        history.push('/login')

        /* ?? NEED TO HANDLE THIS ?? */
      } else {
        /* Set local state with error */
        setError("Something went wrong", result)
      }

      /* Catch errors */
    } catch (error) {
      /* Set local state with error */
      setError(error.response.data)
    }
  }


  return (
    <div>
      <h1>Register Page.</h1>
      <Link to='/'>Welcome Page</Link>
      <br></br>
      <Link to='/login'>Login</Link>

      <form onSubmit={registerPressed}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <br></br>
        <button type="submit">Register</button>
      </form>

      {/* If a Error exists, failed credentials or server error, it gets display here */}
      {error && <p>{error}</p>}
    </div>
  )
}
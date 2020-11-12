import axios from "axios"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"

export default function Register() {
  const [error, setError] = useState(undefined)
  const history = useHistory()

  const register = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    axios.post('/api/register', {
      email: email,
      password: password
    })
      .then(result => {
        if (result.status === 200) {
          history.push('/login')
        } else {
          setError("Something went wrong", result)
        }
      })
      .catch(error => {
        setError(error.response.data)

      })
  }

  return (
    <div>
      <h1>Register Page.</h1>
      <Link to='/'>Welcome Page</Link>
      <br></br>
      <Link to='/login'>Login</Link>

      <form onSubmit={register}>
        <input type="text" name="email" id="email" placeholder="email"></input>
        <br></br>
        <br></br>
        <input type="text" name="password" id="password" placeholder="password"></input>
        <br></br>
        <br></br>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}
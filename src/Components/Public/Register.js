import axios from "axios"
import { Link } from "react-router-dom"

export default function Register() {

  const register = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    axios.post('/register', {
      email: email,
      password: password
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
import { Link } from "react-router-dom"

export default function Login() {

  const login = (event) => {
    event.preventDefault()
    console.log(event.target.email.value)
    console.log(event.target.password.value)
  }

  return (
    <div>
      <h1>Login Page.</h1>
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
    </div>
  )
}
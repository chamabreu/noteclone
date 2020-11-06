import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"

export default function Welcome() {
  const userContext = useContext(UserContext)


  return (
    <div>
      {userContext.authed
        ? <h1>Welcome. You are logged in, {userContext.user}.</h1>
        : <h1>Welcome. Please log in.</h1>
      }
      <Link to='/login'>Login</Link>
      <br></br>
      <Link to='/register'>Register</Link>
    </div>
  )
}
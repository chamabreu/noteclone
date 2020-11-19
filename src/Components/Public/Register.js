/* MODULES */
import { Link, useHistory } from "react-router-dom"
import { useState } from "react"


/* Other */
import { API } from "../../Context/ApiCalls"
import { Button, Form, Jumbotron } from "react-bootstrap"


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
    <>
      <Jumbotron>
        <h1>Register</h1>

        <Link to='/'>
          <Button>
            Welcome Page
          </Button>
        </Link>


        <Link to='/login'>
          <Button>
            Login
          </Button>
        </Link>
      </Jumbotron>

      <Form onSubmit={registerPressed}>
        <Form.Group controlID="registerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlID="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit">Register</Button>
      </Form>

      {/* If a Error exists, failed credentials or server error, it gets display here */}
      {error && <p>{error}</p>}
    </>
  )
}
import { useContext } from 'react'
import UserContext from './Context/UserContext'


export default function Internal() {
  const userContext = useContext(UserContext)

  if (!userContext.data) {
    userContext.getData()
  }


  if (!userContext.data) {
    return (
      <h1>Waiting for Data</h1>
    )
  } else {
    return (
      <>
        <h1>Hi, {userContext.user}</h1>
        <p>Lorem: {userContext.data.lorem}</p>
        <p>Ipsum: {userContext.data.ipsum}</p>
        <button onClick={userContext.logOut}>Logout</button>
      </>
    )

  }

}


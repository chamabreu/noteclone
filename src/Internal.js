import { useContext, useEffect } from 'react'
import { UserContext } from './App'



export default function Internal() {

  const userContext = useContext(UserContext)

  useEffect(() => {
    setTimeout(() => {
      // userContext.getData()
    }, 2000)

  })


  if (!userContext.user) {
    return (
      <h1>Waiting for Data</h1>
    )

  }else {
    return (
      <h1>Hi, {userContext.user}</h1>
    )

  }
}
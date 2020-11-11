import { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import MainView from './MainView/MainView'
import SideBar from './SideBar/SideBar'



export default function Authed() {
  const userContext = useContext(UserContext)


  useEffect(() => {
    if (!userContext.data) {
      userContext.getData()
    }
  })


  if (!userContext.data) {
    return (
      <h1>Waiting for Data</h1>
    )
  } else {
    return (
      <main>

        <Route exact path="/">
          <SideBar />
          <MainView />
        </Route>
        <Route path="/:page">
          <SideBar />
          <MainView />
        </Route>

      </main>
    )

  }

}


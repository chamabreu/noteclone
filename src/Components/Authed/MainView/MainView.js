import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../../Context/UserContext'
import './MainViewStyle.css'

export default function MainView() {
  const userContext = useContext(UserContext)
  const pageID = useParams().page || null
  var pageData = pageID ? userContext.data[pageID].data : null

  if (pageID && pageData) {
    return (
      <div id="mainView">
        <h1>This is {pageData.name}</h1>
        <p>He has the color {pageData.color}</p>
        <p>He is {pageData.size} cm tall</p>
      </div>
    )
  } else {
    return (
      <div id="mainView">
        <h1>Select a Page</h1>
      </div>
    )

  }
}
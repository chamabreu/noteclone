import { useParams } from 'react-router-dom'
import './MainViewStyle.css'

export default function MainView(props) {

  const pageID = useParams().page || null
  if (pageID) {
    var pageData = props.getData(pageID)
    return (
      <div id="mainView">
        <h1>{pageData.title}</h1>
        <p>{pageData.floatText}</p>
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
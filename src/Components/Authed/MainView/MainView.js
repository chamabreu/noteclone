/* MODULES */
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


/* Components */
import PageLink from './PageLink'


/* Other */
import './MainViewStyle.css'
import UserContext from '../../../Context/UserContext'


/* The "Main" part - shows the content of a selected Site (through url :page) */
export default function MainView() {
  const userContext = useContext(UserContext)

  const initID = useParams().page || null
  const initPageData = initID ? userContext.data[initID] : null
  const initName = initPageData ? initPageData.name : ""
  const subPages = initPageData ? initPageData.pages : null

  const [statedPageID, setStatedPageID] = useState(initID || null)
  const [statedPageName, setStatedPageName] = useState(initName)



  const changePageName = (event) => {
    setStatedPageName(event.target.value)
  }

  const saveNewName = () => {
    userContext.updatePageName(statedPageID, statedPageName)
  }

  const addSubPage = () => {
    axios.post('/api/createSubPage', {
      parentPage: statedPageID
    })
      .then(userContext.getData)
      .catch(err => console.log('err :>> ', err))
  }

  const deletePage = () => {
    axios.post('/api/removePage', {
      pageID: statedPageID
    })
      .then(userContext.getData)
      .catch(err => console.log('err :>> ', err))
  }
  
  useEffect(() => {
    setStatedPageID(initID)
    setStatedPageName(initName)
    // setStatedPageData(initPageData)
  }, [initID, initName/* , initPageData */])

  if (statedPageID && initPageData) {
    return (
      <div id="mainView">
        <div id="mvPageHeader">
          <input
            type="text"
            value={statedPageName}
            onChange={changePageName}
            style={{ fontSize: "30px", border: "none", outline: "none", backgroundColor: "lightgray" }}
          />

          {(statedPageName !== initName)
            ? <button onClick={saveNewName}>Save Name</button>
            : null
          }

          <button onClick={deletePage}>Delete</button>
        </div>

        <hr></hr>


        <div id="mvSubPages">
          {initName} has {subPages.length} subpages.
          <button onClick={addSubPage}>Add SubPage</button>
          <p>List of Subpages</p>
          {subPages.map(sp => {
            return (<PageLink name={sp} />)
          })}
        </div>

        <hr></hr>

        <div id="mvPageContent">
          <h3>PLACEHOLDER FOR...</h3>
          <p>... the Data the Page includes.</p>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum.
          </p>
          <p>
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
            diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet.
          </p>
        </div>
      </div>
    )
  } else if (statedPageID && !initPageData) {
    return (
      <div id="mainView">
        <div id="mvPageHeader">
          <p>{statedPageID} does not exist.</p>
        </div>
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

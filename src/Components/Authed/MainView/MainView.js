/* MODULES */
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


/* Components */
import PageLink from './PageLink'


/* Other */
import './MainViewStyle.css'
import { DispatchContext, StateContext } from '../../../Context/StateManager'
import { NEW_SUBPAGE, REMOVE_PAGE, UPDATE_PAGE_NAME } from '../../../Context/DispatchManager';


/* The "Main" part - shows the content of a selected Site (through url :page) */
export default function MainView() {
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  const pageID = useParams().page || null
  const pageData = globalState.data[pageID] || null
  const subPages = pageData ? pageData.pages : null

  const originalPageName = pageData ? pageData.name : null
  const [updatedPageName, setUpdatedPageName] = useState(originalPageName)

  useEffect(() => {
    setUpdatedPageName(originalPageName)
  }, [originalPageName])


  const saveNewName = async () => {
    try {

      let result = await axios.post('/api/updatePageName', {
        pageID: pageID,
        newName: updatedPageName
      })
      if (result.status === 200) {
        globalDispatch({ type: UPDATE_PAGE_NAME, payload: result.data })

      } else {
        throw new Error("UNCATEGORIZED")
      }

    } catch (error) {

      console.log("error saving the new name", error)
    }

  }

  const addSubPage = async () => {
    try {

      let result = await axios.post('/api/createSubPage', {
        parentPage: pageID
      })
      if (result.status === 200) {
        globalDispatch({ type: NEW_SUBPAGE, payload: result.data })

      } else {
        throw new Error("UNCATEGORIZED")
      }

    } catch (error) {

      console.log("error creating NEW_SUBPAGE", error)
    }

  }

  const deletePage = async () => {
    try {

      let result = await axios.post('/api/removePage', {
        pageID: pageID
      })
      if (result.status === 200) {
        globalDispatch({ type: REMOVE_PAGE, payload: result.data })

      } else {
        throw new Error("UNCATEGORIZED")
      }

    } catch (error) {

      console.log("error creating REMOVE_PAGE", error)
    }

  }

  if (pageID && pageData) {
    return (
      <div id="mainView">
        <div id="mvPageHeader">
          <input
            type="text"
            value={updatedPageName}
            onChange={(event) => setUpdatedPageName(event.target.value)}
            style={{ fontSize: "30px", border: "none", outline: "none", backgroundColor: "lightgray" }}
          />

          {(updatedPageName !== originalPageName)
            ? <button onClick={saveNewName}>Save Name</button>
            : null
          }

          <button onClick={deletePage}>Delete</button>
        </div>

        <hr></hr>


        <div id="mvSubPages">
          {updatedPageName} has {subPages.length} subpages.
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
  } else if (pageID && !pageData) {
    return (
      <div id="mainView">
        <div id="mvPageHeader">
          <p>{pageID} does not exist.</p>
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

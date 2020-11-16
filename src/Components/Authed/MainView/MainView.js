/* MODULES */
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';


/* Components */
import PageLink from './PageLink'


/* Other */
import './MainViewStyle.css'
import { DispatchContext, StateContext } from '../../../Context/StateManager'
import { NEW_SUBPAGE, REMOVE_PAGE, RESET, UPDATE_PAGE_NAME } from '../../../Context/DispatchManager';


/* The "Main" part - shows the content of a selected Site (through url :page) */
export default function MainView() {
  /* Get Global Contexts */
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  /* Set "initial" data on every render, does not need to be stored in state */
  const pageID = useParams().page || null
  const pageData = globalState.data[pageID] || null
  const subPages = pageData ? pageData.pages : null
  const originalPageName = pageData ? pageData.name : null

  /* updatedPageName is used in state for handling userInput in the name input field */
  const [updatedPageName, setUpdatedPageName] = useState(originalPageName)

  /* updatedPageName gets updated if the originalPageName changes */
  useEffect(() => {
    setUpdatedPageName(originalPageName)
  }, [originalPageName])


  /* if user changed name and click save */
  const saveNewName = async () => {
    try {

      /* call api to update name */
      let result = await axios.post('/api/updatePageName', {
        pageID: pageID,
        newName: updatedPageName
      })

      /* If success, set the data in the globalState */
      if (result.status === 200) {
        globalDispatch({ type: UPDATE_PAGE_NAME, payload: result.data })

        /* Handle this??? */
      } else {
        throw new Error("UNCATEGORIZED")
      }

      /* Catch errors */
    } catch (error) {
      if (error.response.status === 401) {
        globalDispatch({type: RESET})
      }else {
        console.log("error saving the new name", error)
      }
    }

  }

  /* if user clicks addSubPage */
  const addSubPage = async () => {
    try {

      /* call api to create a subpage */
      let result = await axios.post('/api/createSubPage', {
        parentPage: pageID
      })

      /* If success, set the data in the globalState */
      if (result.status === 200) {
        globalDispatch({ type: NEW_SUBPAGE, payload: result.data })


        /* Handle this??? */
      } else {
        throw new Error("UNCATEGORIZED")
      }

      /* Catch errors */
    } catch (error) {
      if (error.response.status === 401) {
        globalDispatch({type: RESET})
      }else {
        console.log("error creating NEW_SUBPAGE", error)
      }
    }
  }

  /* if user deletes a page */
  const deletePage = async () => {
    try {

      /* call api to delete a page */
      let result = await axios.post('/api/removePage', {
        pageID: pageID
      })

      /* if succes, set the data in the globalState */
      if (result.status === 200) {
        globalDispatch({ type: REMOVE_PAGE, payload: result.data })


        /* Handle this?? */
      } else {
        throw new Error("UNCATEGORIZED")
      }


      /* catch errors */
    } catch (error) {
      if (error.response.status === 401) {
        globalDispatch({type: RESET})
      }else {
        console.log("error creating REMOVE_PAGE", error)
      }
    }

  }

  /* RENDER MAIN VIEW */
  /* If a pageURL is entered and there is data to that url */
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
          {/* Map here the subpages of that Page */}

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



    /* If there is a url entered but no pageData to that URL (like a 404) */
  } else if (pageID && !pageData) {
    return (
      <div id="mainView">
        <div id="mvPageHeader">
          <p>{pageID} does not exist.</p>
        </div>
      </div>
    )


    /* On no specified URL just show default text */
  } else {
    return (
      <div id="mainView">
        <h1>Select a Page</h1>
      </div>
    )

  }


}

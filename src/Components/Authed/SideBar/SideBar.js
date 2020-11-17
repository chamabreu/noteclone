/* MODULES */
import { useContext, useState } from 'react'

/* Components */
import SBPageContent from './SBPage/SBPageContent'


/* Other */
import './SideBarStyles.css'
import './SBAccountHeaderStyle.css'
import './SBContentSectionStyle.css'
import { DispatchContext, StateContext } from '../../../Context/StateManager'
import { NEW_PAGE, RESET } from '../../../Context/DispatchManager';
import { API } from '../../../Context/ApiCalls'


/* The sidebar in the main div */
export default function SideBar() {

  /* get global contexts */
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  /* set local states */
  const [sbOpened, setSBOpened] = useState(true)


  /* Plus button pressed to create a new TopLevel Page */
  const createNewPage = async () => {
    try {
      /* Set new Page on API and get the new data back*/
      let result = await API.newPage() 

      /* And "update" the global state with the result */
      globalDispatch({ type: NEW_PAGE, payload: result.data })

      /* Catch errors */
    } catch (error) {
      if (error.response.status === 401) {
        globalDispatch({type: RESET})
      }else {
        console.log('create new page error :>> ', error)
      }
    }

  }

  /*
    The render depends on the sbOpened state.
    maybe outsource this for better overview in 2 components -> SBClosed and SBOpened ???
   */
  return (
    <div id="sideBar" className={sbOpened ? "opened" : "closed"}>

      {/* SIDEBAR HEADER AND ACCOUNT MANAGEMENT */}
      <div className={`sideBarHeader ${sbOpened ? "" : "closed"}`}>
        <div className={`accountSection ${sbOpened ? "" : "closed"}`}>
          <div className={`accountHeader ${sbOpened ? "" : "closed"}`}>

            {sbOpened

              /* If sidebar is opened */
              ? <>
                <div className="accountName">
                  Acount-Name: {globalState.user}
                </div>

                <button id="closeSideBarButton" onClick={() => setSBOpened(!sbOpened)}>
                  <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path></svg>
                </button>
              </>



              /* If sidebar is closed */
              : <button id="closeSideBarButton" onClick={() => setSBOpened(!sbOpened)}>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path></svg>
              </button>

            }
          </div>

        </div>
      </div>

      {/* SIDEBAR USER PAGES */}
      {sbOpened

        /* If sidebar is opened */
        ? <>
          <div className="sideBarContent">

            <div id="pageHeader">
              <div id="pageHeaderLabel">
                Pages
                </div>

              <button id="addPageButton" onClick={createNewPage}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
              </button>
            </div>


            <div className="pagesContainer">
              {globalState.data.pages.length === 0
                ? "You have no Pages so far"
                : <SBPageContent pagesList={globalState.data.pages} />
              }
            </div>

          </div>

          <div id="logOutButton" onClick={() => {
            API.logOut()
              .then(() => globalDispatch({ type: "LOG_OUT" }))
              .catch((error) => console.log('error :>> ', error))
          }}>
            Log Me Out
            </div>
        </>

        /* If sidebar is closed */
        : null
      }


    </div >
  )
}
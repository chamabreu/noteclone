/* MODULES */
import { useContext, useState } from 'react'
import axios from 'axios';

/* Components */
import SBPageContent from './SBPage/SBPageContent'


/* Other */
import './SideBarStyles.css'
import './SBAccountHeaderStyle.css'
import './SBContentSectionStyle.css'
import { DispatchContext, StateContext } from '../../../Context/StateManager'
import { NEW_PAGE } from '../../../Context/DispatchManager';


/* The sidebar in the main div */
export default function SideBar() {
  const globalState = useContext(StateContext)
  const globalDispatch = useContext(DispatchContext)

  const [sbOpened, setSBOpened] = useState(true)
  const toggleSideBar = () => {
    setSBOpened(!sbOpened)
  }


  const createNewPage = () => {
    axios.post('/api/newPage')
      .then((result) => {
        globalDispatch({ type: NEW_PAGE, payload: result.data})
      })
      .catch(error => console.log('error :>> ', error))

  }

  if (sbOpened) {
    return (
      <div id="sideBar" className="opened">

        {/* SIDEBAR HEADER AND ACCOUNT MANAGEMENT */}
        <div className="sideBarHeader">
          <div className="accountSection">
            <div className="accountHeader">
              <div className="accountName">
                Acount-Name: {globalState.user}
              </div>

              <button id="closeSideBarButton" onClick={toggleSideBar}>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path></svg>
              </button>
            </div>

          </div>
        </div>

        {/* SIDEBAR USER PAGES */}
        <div className="sideBarContent">

          <div id="pageHeader">
            <div id="pageHeaderLabel">
              Pages
            </div>

            <button id="addPageButton" onClick={createNewPage}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>              </button>
          </div>


          <div className="pagesContainer">
            {globalState.data.pages.length === 0
              ? "You have no Pages so far"
              : <SBPageContent pagesList={globalState.data.pages} />
            }
          </div>

        </div>

        <div id="logOutButton" onClick={() => {
          axios.post('/api/logout')
            .then(() => globalDispatch({ type: "LOG_OUT" }))
            .catch((error) => console.log('error :>> ', error))
        }}>
          Log Me Out
        </div>

      </div >
    )
  } else {
    return (
      <div id="sideBar" className="closed">
        <div className="sideBarHeader closed">
          <div className="accountSection closed">
            <div className="accountHeader closed">
              <button id="closeSideBarButton" onClick={toggleSideBar}>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path></svg>
              </button>

            </div>

          </div>
        </div>
      </div>
    )

  }
}
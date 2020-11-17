/* MODULES */
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"



/* Other */
import { StateContext } from "../../../../../Context/StateManager"


/* A sidebare single Page - calls itself for nested pages */
export default function SBPage(props) {

  /* This is the pageID from the URL */
  const pageURL = useParams().page

  /* Check if the SBPage is the current selected site to "highlight" it in the sidebar */
  const isCurrentSite = (pageURL === props.pageID) ? "active" : ""

  /* Get Global context */
  const globalState = useContext(StateContext)


  /* See SBPageContent Recursive Function */
  const getSubPages = (pageArray) => {
    const subPages = {}
    if (pageArray.length > 0 && pageArray[0] !== "") {
      for (const pageID of pageArray) {
        subPages[pageID] = globalState.data[pageID].pages
      }
      return subPages
    } else {
      return subPages
    }
  }


  /* See SBPageContent Recursive Function */
  const containsURL = (checkPages) => {
    if (Object.keys(checkPages).length > 0) {
      for (const subPage of Object.keys(checkPages)) {
        let nestedPages = getSubPages(globalState.data[subPage].pages)


        if (pageURL === subPage) {
          return true


        } else {
          if (Object.keys(nestedPages).length !== 0) {
            if (containsURL(nestedPages)) {
              return true
            }


          } else {
            continue
          }
        }
      }
    } else {
      return false
    }
  }

  /* Set local state */
  const [pageOpened, setPageOpened] = useState(containsURL(getSubPages(props.pagesList)))
  // useEffect(() => {
  //   setPageOpened(containsURL(getSubPages(props.pagesList)))
  // })









  /* Create a empty childPages Array to hold all child pages */
  let childPages = []
  for (const pageID of Object.keys(getSubPages(props.pagesList))) {
    // let subPageOpened = containsURL(getSubPages([pageID])) ? true : false

    childPages.push(
      <SBPage
        key={pageID}
        pageID={pageID}
        name={globalState.data[pageID].name}
        pagesList={getSubPages(props.pagesList)[pageID]}
        indentLevel={props.indentLevel + 1}
      />
    )
  }


  /*
    The Render depends on pageOpened
    If pageOpened, it shows the subpages, which are alsy SBPage Components
   */
  return (
    /* Creates a pageBox for every page. In it can live multiple subpages as SBPage Components which have their own pageBox etc... */
    <div className="pageBox">
      <div className={`pageHead ${isCurrentSite} ${pageOpened ? "opened" : "closed"}`} style={{ paddingLeft: `${props.indentLevel}rem` }}>
        <div className="pageFlex">
          <button className="pageIndicator" onClick={() => { setPageOpened(!pageOpened) }}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
          </button>
          <Link to={`/${props.pageID}`} className="pageLabel">{props.name}</Link>
        </div>
      </div>



      <div className="pageChilds" style={{ display: `${pageOpened ? "" : "none"}` }}>
        {/* Check if there are childPages */}
        {childPages.length !== 0

          /* Render Childpages */
          ? childPages

          /* Else show "No Subpage" */
          : <span className="noSubPage" style={{ paddingLeft: `${props.indentLevel + 1}rem` }}>
            No Subpages
            </span>
        }
      </div>



    </div>
  )

}
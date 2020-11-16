/* MODULES */
import { useContext, useState } from "react"
import { Link, useParams } from "react-router-dom"



/* Other */
import { StateContext } from "../../../../../Context/StateManager"


/* A sidebare single Page - calls itself for nested pages */
export default function SBPage(props) {
  const globalState = useContext(StateContext)

  
  const [pageOpen, setPageOpen] = useState(props.opened)
  const pageURL = useParams().page

  const isCurrentSite = (pageURL === props.pageID) ? "active" : ""


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


  // Cycle in the forLoop through all subpages and check if there is such an :page
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

  const openPageContent = () => {
    pageOpen === "closed" ? setPageOpen("opened") : setPageOpen("closed")
  }


  let childPages = []
  for (const pageID of Object.keys(getSubPages(props.pagesList))) {
    let subPageOpened = containsURL(getSubPages([pageID])) ? true : false

    childPages.push(
      <SBPage
        key={pageID}
        pageID={pageID}
        name={globalState.data[pageID].name}
        pagesList={getSubPages(props.pagesList)[pageID]}
        indentLevel={props.indentLevel + 1}
        opened={subPageOpened ? "opened" : "closed"}
      />
    )
  }



  if (pageOpen === "opened") {
    return (
      <div className="pageBox">
        <div className={`pageHead ${isCurrentSite} ${pageOpen}`} style={{ paddingLeft: `${props.indentLevel}rem` }}>
          <div className="pageFlex">
            <button className="pageIndicator" onClick={openPageContent}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
            </button>
            <Link to={`/${props.pageID}`} className="pageLabel">{props.name}</Link>
          </div>
        </div>

        {pageOpen === "opened"

          ? <div className="pageChilds">


            {childPages.length === 0
              ? <span className="noSubPage" style={{ paddingLeft: `${props.indentLevel + 1}rem` }}>
                No Subpages
            </span>


              : childPages
            }


          </div>
          : null


        }
      </div>
    )
  } else {
    return (
      <div className="pageBox">
        <div className={`pageHead ${isCurrentSite} ${pageOpen}`} style={{ paddingLeft: `${props.indentLevel}rem` }}>
          <div className="pageFlex">
            <button className="pageIndicator" onClick={openPageContent}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
            </button>
            <Link to={`/${props.pageID}`} className="pageLabel">{props.name}</Link>
          </div>
        </div>
        <div className="pageChilds">
        </div>
      </div>
    )
  }
}
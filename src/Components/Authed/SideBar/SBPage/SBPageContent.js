import './SBPageContentStyle.css'
import SBPage from './Page/SBPage'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../../../../Context/UserContext'

export default function SBPageContent(props) {
  const userContext = useContext(UserContext)

  const getSubPages = (pageArray) => {
    const subPages = {}
    if (pageArray.length > 0 && pageArray[0] !== "") {
      for (const pageID of pageArray) {
        subPages[pageID] = userContext.data[pageID].pages
      }
      return subPages
    } else {
      return subPages
    }
  }

  // Get the :page adress
  const pageURL = useParams().page

  // Cycle in the forLoop through all subpages and check if there is such an :page
  const containsURL = (checkPages) => {
    // console.log('checkPages :>> ', checkPages);
    if (Object.keys(checkPages).length > 0) {
      for (const subPage of Object.keys(checkPages)) {
        let nestedPages = getSubPages(userContext.data[subPage].pages)
        // console.log("Found nestedPages", nestedPages)
  
  
        if (pageURL === subPage) {
          // console.log("Page URL", pageURL, "and subPage", subPage,  "matches")
          return true
  
  
        }else {
          // console.log("NOPE! Page URL", pageURL, "and subPage", subPage,  "Dont match")
  
          if (Object.keys(nestedPages).length !== 0) {
            // console.log("------------------ nestedPages Contains")
            if (containsURL(nestedPages)) {
              return true
            }
          }else {
            continue
          }
        }
      }
    }else {
      return false
    }
  }


  let childPages = []
  for (const pageID of Object.keys(getSubPages(props.pagesList))) {
    let opened = pageURL !== pageID ? containsURL(getSubPages([pageID])) : false

    childPages.push(
      <div key={pageID} style={{ margin: "0.5rem 0" }}>
        <hr style={{ margin: "0px 0px 3px 0px", borderWidth: 0, height: 1, backgroundColor: "grey", opacity: 0.2 }} />
        <SBPage
          key={pageID}
          pageID={pageID}
          name={userContext.data[pageID].name}
          pagesList={getSubPages(props.pagesList)[pageID]}
          indentLevel={0}
          opened={opened ? "opened" : "closed"}
        />
      </div>
    )
  }



  return (
    <div className="projectContent">
      {/* <p>Components</p> */}
      {childPages}
    </div>
  )
}
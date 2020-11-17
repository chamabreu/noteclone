/* MODULES */
import './SBPageContentStyle.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'


/* Components */
import SBPage from './Page/SBPage'


/* Other */
import { StateContext } from '../../../../Context/StateManager'


/*
  Sidebar Section of the Pages - here are the "Top-Level-Pages" called as SBPage 
  the SBPages calls then itself multiple times for the other subpages -> look SBPage.js
*/
export default function SBPageContent(props) {
  /* Get global Context */
  const globalState = useContext(StateContext)

  // Get the :page adress - this is always the pageID itself
  const pageURL = useParams().page


  /*
    Recursive function to get ALL subpages of an pages prop of a page
    MAYBE NEEDS REWORK AND OUTSOURCE
  */
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


  /*
    Recursive Function to check if the active URL is a subpage of a TopLevel Page
    This function is used to "unfold" all subpages of a specific page on reload
    so that the sidebar page-tree opens automatically all subpages to the specific page
    MAYBE NEEDS REWORK AND OUTSOURCE
   */
  // const containsURL = (checkPages) => {
  //   if (Object.keys(checkPages).length > 0) {
  //     for (const subPage of Object.keys(checkPages)) {
  //       let nestedPages = getSubPages(globalState.data[subPage].pages)


  //       if (pageURL === subPage) {
  //         return true


  //       } else {
  //         if (Object.keys(nestedPages).length !== 0) {
  //           if (containsURL(nestedPages)) {
  //             return true
  //           }


  //         } else {
  //           continue
  //         }
  //       }
  //     }
  //     return false
      
  //   } else {
  //     return false
  //   }
  // }


  /* Create a empty topLevelPages Array to hold all top level pages */
  let topLevelPages = []
  for (const pageID of Object.keys(getSubPages(props.pagesList))) {

    // let opened = pageURL !== pageID ? containsURL(getSubPages([pageID])) : true

    topLevelPages.push(
      <div key={pageID} style={{ margin: "0.5rem 0" }}>
        <hr style={{ margin: "0px 0px 3px 0px", borderWidth: 0, height: 1, backgroundColor: "grey", opacity: 0.2 }} />
        <SBPage
          key={pageID}
          pageID={pageID}
          name={globalState.data[pageID].name}
          pagesList={getSubPages(props.pagesList)[pageID]}
          indentLevel={0}
          // opened={opened}
        />
      </div>
    )
  }



  /* Render a div with all topLevelPages as childs */
  return (
    <div className="projectContent">
      {topLevelPages}
    </div>
  )
}
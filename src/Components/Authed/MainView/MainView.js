import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../../Context/UserContext'
import './MainViewStyle.css'
import axios from 'axios'

export default function MainView() {
  const userContext = useContext(UserContext)

  const initID = useParams().page || null
  const initPageData = initID ? userContext.data[initID] : null
  const initName = initPageData ? initPageData.name : ""
  const subPages = initPageData ? initPageData.pages : null
  console.log('subPages :>> ', subPages);

  const [statedPageID, setStatedPageID] = useState(initID || null)
  const [statedPageName, setStatedPageName] = useState(initName)



  const changePageName = (event) => {
    setStatedPageName(event.target.value)
  }

  const saveNewName = () => {
    userContext.updatePageName(statedPageID, statedPageName)
  }

  const addSubPage = () => {
    axios.post('/createSubPage', {
      parentPage: statedPageID
    })
      .then(userContext.getData())
      .catch(err => console.log('err :>> ', err))
  }

  const deletePage = () => {
    axios.post('/removePage', {
      pageID: statedPageID
    })
    .then(userContext.getData())
    .catch(err => console.log('err :>> ', err))
  }

  useEffect(() => {
    setStatedPageID(initID)
    setStatedPageName(initName)
  }, [initID, initName])

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
// export default function MainView() {
//   // const userContext = useContext(UserContext)
//   // const pageID = useParams().page || null
//   // console.log("pageID", pageID)

//   const [pageID, setPageID] = useState(useParams().page || null)
//   // const [pageData, setPageData] = useState(pageID ? userContext.data[pageID] : null)
//   // const [pageName, setPageName] = useState(pageID ? pageData.name : "")


//   // const changePageName = (event) => {
//   //   // setPageName(event.target.value)
//   //   // userContext.updatePageName(pageID, event.target.value)
//   // }

//   // const saveNewName = () => {
//   //   userContext.updatePageName(pageID, pageName)
//   // }

//   // useEffect(() => {
//   //   setPageName(defaultPageName)
//   // }, [pageID])

//   if (pageID && pageData) {
//     return (
//       <div id="mainView">
//         <h1>{pageID}</h1>
//         <input
//         type="text"
//         value={pageName}
//         onChange={changePageName}
//         style={{fontSize: "30px", border: "none", outline: "none", backgroundColor: "lightgray"}} />
//         <button onClick={saveNewName}>Save</button>
//       </div>
//     )
//   } else {
//     return (
//       <div id="mainView">
//         <h1>Select a Page</h1>
//       </div>
//     )

//   }
// }
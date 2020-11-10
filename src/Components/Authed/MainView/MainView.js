import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../../../Context/UserContext'
import './MainViewStyle.css'

export default function MainView() {
  const userContext = useContext(UserContext)

  const initID = useParams().page || null
  const initPageData = initID ? userContext.data[initID] : null
  const initName = initPageData ? initPageData.name : ""

  const [statedPageID, setStatedPageID] = useState(initID || null)
  const [statedPageName, setStatedPageName] = useState(initName)



  const changePageName = (event) => {
    setStatedPageName(event.target.value)
  }

  const saveNewName = () => {
    userContext.updatePageName(statedPageID, statedPageName)
  }

  useEffect(() => {
    setStatedPageID(initID)
    setStatedPageName(initName)
  }, [initID, initName])

  if (statedPageID && initPageData) {
    return (
      <div id="mainView">
        <input
          type="text"
          value={statedPageName}
          onChange={changePageName}
          style={{ fontSize: "30px", border: "none", outline: "none", backgroundColor: "lightgray" }} />
        <button onClick={saveNewName}>Save</button>
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
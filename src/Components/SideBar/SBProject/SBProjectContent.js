import './SBProjectContentStyle.css'
import SBProjectPage from './Page/SBProjectPage'
import { useParams } from 'react-router-dom'

export default function SBProjectContent(props) {
  const pages = props.getPages(props.pagesList)
  // pages: {
  //   animalsID: {
  //     name: "Animals",
  //     pages: ["p2Child1ID", "andOneMoreChildID"]
  //   },
  //   .... : {...},
  // }

  // Get the :page adress
  const pageURL = useParams().page

  // Cycle in the forLoop through all subpages and check if there is such an :page
  const containsURL = (checkPages) => {
    for (const pageID of Object.keys(checkPages)) {
      let subPages = props.getPages(checkPages[pageID].pages)
      if (pageID === pageURL) {
        return true
      }else {
        if (containsURL(subPages)) {
          return true
        }else {
          return false
        }
      }
    }
  }

  let projectComponents = []
  for (const pageID of Object.keys(pages)) {

    let opened = containsURL(props.getPages([pageID]))

    projectComponents.push(
      <div key={pageID} style={{margin: "0.5rem 0"}}>
        <hr style={{ margin: 0, borderWidth: 0, height: 1, backgroundColor: "grey", opacity: 0.2 }} />
        <SBProjectPage
          key={pageID}
          pageID={pageID}
          name={pages[pageID].name}
          childPages={pages[pageID]}
          getPages={props.getPages}
          indentLevel={0}
          opened={opened ? "opened" : "closed"}
        />
      </div>
    )
  }

  return (
    <div className="projectContent">
      {projectComponents}
    </div>
  )
}
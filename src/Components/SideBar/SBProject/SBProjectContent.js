import './SBProjectContentStyle.css'
import SBProjectPage from './Page/SBProjectPage'

export default function SBProjectContent(props) {
  const pages = props.getPages(props.pagesList)
  // pages: {
  //   animalsID: {
  //     name: "Animals",
  //     pages: ["p2Child1ID", "andOneMoreChildID"]
  //   },
  //   .... : {...},
  // }

  let projectComponents = []
  for (const pageID of Object.keys(pages)) {
    projectComponents.push(
      <div key={pageID}>
        <hr style={{margin: 0, borderWidth: 0, height: 1, backgroundColor: "grey", opacity: 0.2}}/>
        <SBProjectPage
          key={pageID}
          name={pages[pageID].name}
          childPages={pages[pageID]}
          getPages={props.getPages}
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
import './SBProjectContentStyle.css'
import SBProjectPage from './Page/SBProjectPage'

export default function SBProjectContent(props) {

  let projectComponents = []
  for (const projectName of Object.keys(props.projects)) {
    projectComponents.push(
      <div key={projectName}>
        <hr style={{margin: 0, borderWidth: 0, height: 1, backgroundColor: "grey", opacity: 0.2}}/>
        <SBProjectPage key={projectName} name={projectName} childPages={props.projects[projectName]}/>
      </div>
    )
  }

  return (
    <div className="projectContent">
      {projectComponents}
    </div>
  )
}
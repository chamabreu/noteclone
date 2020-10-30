import SBProjectContent from './SBProject/SBProjectContent'
import SBAccountSelector from './SBAccount/SBAccountSelector'
import './SideBarStyles.css'
import './SBAccountHeaderStyle.css'
import './SBContentSectionStyle.css'




export default function SideBar(props) {
  const activeUserID = Object.keys(props.activeUser)[0]
  const pages = props.activeUser[activeUserID].pages

  if (props.sideBarClosed) {
    return(
      <div id="sideBar" className="closed">
        <div className="sideBarHeader">
          <div className="accountSection">
            <div className="accountHeader">
              <button id="closeSideBarButton" onClick={props.closeSideBar}>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }else {
    return(
      <div id="sideBar" className="opened">
  
        {/* SIDEBAR HEADER AND ACCOUNT MANAGEMENT */}
        <div className="sideBarHeader">
          <div className="accountSection">
            <div className="accountHeader">
              <SBAccountSelector
                allUserList={props.allUserList}
                switchUser={props.switchUser}
                activeUser={props.activeUser}
              />
              
              <button id="closeSideBarButton" onClick={props.closeSideBar}>
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-alt-circle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"></path></svg>
              </button>
            </div>
  
  
            <div className="accountButtons">
              {/* <SBAccountButton buttonName="Quick Find"/>
              <SBAccountButton buttonName="All Updates"/>
              <SBAccountButton buttonName="Settings"/> */}
            </div>
  
          </div>
        </div>
  
        {/* SIDEBAR USER PROJECTS */}
        <div className="sideBarContent">
  
          <div id="projectsLabel">
            Projects
          </div>
  
          <div className="projectsContainer">
            {pages && 
              <SBProjectContent projects={pages}/>
            }
          </div>
  
        </div>
  
      </div>
    )
  }
}
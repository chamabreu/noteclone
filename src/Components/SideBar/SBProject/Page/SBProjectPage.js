import { useState } from "react"

export default function SBProjectPage(props) {
  const [opened, setOpened] = useState("closed")

  const openPageContent = () => {
    opened === "closed" ? setOpened("opened") : setOpened("closed")
  }
 
  var childPages = props.childPages
  const pages = props.getPages(childPages.pages)
  var subComps = []
  for (const pageID of Object.keys(pages)) {
    subComps.push(
        <SBProjectPage
          key={pageID}
          name={pages[pageID].name}
          childPages={pages[pageID]}
          getPages={props.getPages}
        />
    )
  }

  if (opened === "opened") {
    return(
      <div className="pageBox">
        <div className="pageHead">
          <div className={"pageContent " + opened}>
            <div className="pageDetails">
              <button className="pageIndicator" onClick={openPageContent}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
              </button>
              <div className="pageLabel">{props.name}</div>
            </div>
          </div>
        </div>

        <div className="pageChilds">
          {subComps.length === 0 ? <span className="noSubPage">No Subpages</span> : subComps}
        </div>
      </div>
    )
  }else {
    return(
      <div className="pageBox">
        <div className="pageHead">
          <div className={"pageContent " + opened}>
            <div className="pageDetails">
              <button className="pageIndicator" onClick={openPageContent}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
              </button>
              <div className="pageLabel">{props.name}</div>
            </div>
          </div>
        </div>
        <div className="pageChilds">
        </div>
      </div>
    )
  }
}
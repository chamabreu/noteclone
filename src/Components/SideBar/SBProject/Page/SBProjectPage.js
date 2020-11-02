import { useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function SBProjectPage(props) {
  const [opened, setOpened] = useState(props.opened)

  const isCurrentSite = useParams().page === props.pageID ? "active" : ""

  const openPageContent = () => {
    opened === "closed" ? setOpened("opened") : setOpened("closed")
  }

  const pageURL = useParams().page
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

  var childPages = props.childPages
  const pages = props.getPages(childPages.pages)
  var subComps = []
  for (const pageID of Object.keys(pages)) {
    let opened = containsURL(props.getPages([pageID]))

    subComps.push(
      <SBProjectPage
        key={pageID}
        pageID={pageID}
        name={pages[pageID].name}
        childPages={pages[pageID]}
        getPages={props.getPages}
        indentLevel={props.indentLevel + 1}
        opened={opened ? "opened" : "closed"}
        />
    )
  }

  if (opened === "opened") {
    return (
      <div className="pageBox">
        <div className={`pageHead ${isCurrentSite} ${opened}`} style={{ paddingLeft: `${props.indentLevel}rem` }}>
          <div className="pageFlex">
            <button className="pageIndicator" onClick={openPageContent}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right" className="svg-inline--fa fa-caret-right fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>
            </button>
            <Link to={`/${props.pageID}`} className="pageLabel">{props.name}</Link>
          </div>
        </div>

        <div className="pageChilds">
          {subComps.length === 0
            ? <span className="noSubPage" style={{ paddingLeft: `${props.indentLevel + 1}rem` }}>
              No Subpages
            </span>
            : subComps
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className="pageBox">
        <div className={`pageHead ${isCurrentSite} ${opened}`} style={{ paddingLeft: `${props.indentLevel}rem` }}>
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
// import React from 'react';
// import SideBar from './Components/SideBar/SideBar'
// import MainView from './Components/MainView/MainView'
// import './AppStyle.css'
// import {Route, Switch } from 'react-router-dom';
// import db from './FakeDB'
// import Welcome from './Components/Public/Welcome';
// import Login from './Components/Public/Login';
// import Register from './Components/Public/Register';



// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       // Empty List to hold All Users in db for Account-Selector
//       allUserList: [],
//       // State of active User. Object of {userID: "UserName"}.
//       activeUser: { empty: "empty" },
//       // SideBar State
//       sideBarClosed: false
//     }

//     // Bind Functions
//     this.switchUser = this.switchUser.bind(this)
//     this.closeSideBar = this.closeSideBar.bind(this)
//     this.getPages = this.getPages.bind(this)
//     this.getData = this.getData.bind(this)
//   }


//   componentDidMount() {
//     let dbUsers = []

//     // Simulation of fetching users from server
//     for (const userID of Object.keys(db.users)) {
//       // Cycle through ALL users keys (ids) and create a Object of each USer
//       // {userID: "UserName"}
//       dbUsers.push({ [userID]: db.users[userID].name })
//     }

//     // Set State of All users in DB
//     this.setState({
//       allUserList: dbUsers
//     })

//     // this.switchUser({target: {value: "mamaID"}})
//   }

//   // When Account-Selector switches User
//   switchUser(event) {

//     // event.target == <input select>
//     // .value is the given userID
//     const userID = event.target.value
//     // get all userData from db
//     const userData = db.users[event.target.value]

//     // Set State for active User as Object
//     // activeUser: {
//     //   userID: {
//     //     name: "UserName",
//     //     pages: ["pageID1", "pageID2", "..."]
//     //   },
//     // }
//     this.setState({
//       activeUser: {
//         [userID]: userData
//       }
//     })
//   }

//   // Button to close Sidebar
//   closeSideBar() {
//     // If sidebar is closed, Sidebar only renders the Button
//     // to save Space on the left Side
//     this.setState((state) => ({
//       sideBarClosed: !state.sideBarClosed
//     }))
//   }

//   // For SBProjectContent getPages()
//   getPages(pagesList) {
//     let pages = {}
//     for (const pageID of pagesList) {
//       pages[pageID] = db.pages[pageID]
//     }
//     return pages
//   }

//   getData(pageID) {
//     return db.contents[pageID]
//   }



//   render() {
//     return (
//       <main>
//         <Switch>
//           <Route exact path='/' component={Welcome} />
//           <Route exact path='/login' component={Login} />
//           <Route exact path='/register' component={Register} />
//         </Switch>

//         {/* <Switch>
          // <Route exact path="/">
          //   <SideBar
          //     // for Account-Selector
          //     allUserList={this.state.allUserList}
          //     // for SBPageContent
          //     activeUser={this.state.activeUser}
          //     // for SideBar Handling
          //     sideBarClosed={this.state.sideBarClosed}
          //     // Functions
          //     switchUser={this.switchUser}
          //     closeSideBar={this.closeSideBar}
          //     getPages={this.getPages}
          //   />
          //   <MainView getData={this.getData} />
          // </Route>
          // <Route path="/:page">
          //   <SideBar
          //     // for Account-Selector
          //     allUserList={this.state.allUserList}
          //     // for SBPageContent
          //     activeUser={this.state.activeUser}
          //     // for SideBar Handling
          //     sideBarClosed={this.state.sideBarClosed}
          //     // Functions
          //     switchUser={this.switchUser}
          //     closeSideBar={this.closeSideBar}
          //     getPages={this.getPages}
          //   />
          //   <MainView getData={this.getData} />
          // </Route>

//         </Switch> */}
//       </main>
//     );
//   }
// }

// export default App;

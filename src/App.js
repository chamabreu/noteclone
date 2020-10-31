import React from 'react';
import SideBar from './Components/SideBar/SideBar'
import MainView from './Components/MainView/MainView'
import './AppStyle.css'

const db = {
  users: {
    mamaID: {
      name: "Mama",
      pages: ["housingID"]
    },
  },

  pages: {
    animalsID: {
      name: "Animals",
      pages: ["lionID", "catID"]
    },
    lionID: {
      name: "Lion",
      pages: [],
    },
    catID: {
      name: "Cat",
      pages: [],
    },
    housingID: {
      name: "Housing",
      pages: ['bedID', "officeID"],
    },
    bedID: {
      name: "Bed",
      pages: ["manuelID", "sarahID"]
    },
    officeID: {
      name: "Office",
      pages: ["computerID", "speakersID"]
    },
    computerID: {
      name: "Computer",
      pages: []
    },
    speakersID: {
      name: "Speaker",
      pages: []
    },
    manuelID: {
      name: "Manuel",
      pages: ['lightsID']
    },
    sarahID: {
      name: "Sarah",
      pages: []
    },
    lightsID: {
      name: "Lights",
      pages: []
    },
    waterID: {
      name: "Water",
      pages: []
    }
  },

  contents: {
    animalsID: {
      title: "Hi this is Animals Page",
      floatText: "Animlas akslanknoe alk vklavdalo a lrga oöpv daklgaöf opöa gklakl adoög elka vkdanvoöpad"
    },
    lionID: {
      title: "A Lion Appears",
      floatText: "ROAAAARRR"
    },
    catID: {
      title: "A Cat is nearly a Lion",
      floatText: "MEAOUW"
    },
    housingID: {
      title: "Housing",
      floatText: "gdahkgdanökndaihgoaeng  üakpäf kaäp apä käpa ka"
    },
    bedID: {
      title: "Bed",
      floatText: "agpääpqpiwqoptoepq iot qepü iqüi oq q"
    },
    officeID: {
      title: "Office",
      floatText: "ncmbyxbnmc,xny.,xmn.<my-. ,.-m,<m,.m.,"
    },
    manuelID: {
      title: "Manuel",
      floatText: "Manuelfnakngaölgnadlngkadnpeona 456841231"
    },
    sarahID: {
      title: "Sarah",
      floatText: "/*/-*/-*/-//-/-+/-*/+-/-/*-+/-*+/-*/*-/-+*/-/*-/+-"
    },
    lightsID: {
      title: "Lights",
      floatText: "78503105093170953108679031759318780743194ß13z0"
    }
  }
}


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // Empty List to hold All Users in db for Account-Selector
      allUserList: [],
      // State of active User. Object of {userID: "UserName"}.
      activeUser: {empty: "empty"},
      // SideBar State
      sideBarClosed: false
    }

    // Bind Functions
    this.switchUser = this.switchUser.bind(this)
    this.closeSideBar = this.closeSideBar.bind(this)
    this.getPages = this.getPages.bind(this)
  }


  componentDidMount() {
    let dbUsers = []

    // Simulation of fetching users from server
    for (const userID of Object.keys(db.users)) {
      // Cycle through ALL users keys (ids) and create a Object of each USer
      // {userID: "UserName"}
      dbUsers.push({[userID]: db.users[userID].name})
    }
    
    // Set State of All users in DB
    this.setState({
      allUserList: dbUsers
    })
  }
  
  // When Account-Selector switches User
  switchUser(event) {
    // event.target == <input select>
    // .value is the given userID
    const userID = event.target.value
    // get all userData from db
    const userData = db.users[event.target.value]
    
    // Set State for active User as Object
    // activeUser: {
    //   userID: {
    //     name: "UserName",
    //     pages: ["pageID1", "pageID2", "..."]
    //   },
    // }
    this.setState({
      activeUser: {
        [userID]: userData
      }
    })
  }

  // Button to close Sidebar
  closeSideBar() {
    // If sidebar is closed, Sidebar only renders the Button
    // to save Space on the left Side
    this.setState((state) => ({
      sideBarClosed: !state.sideBarClosed
    }))
  }

  // For SBProjectContent getPages()
  getPages(pagesList) {
    let pages = {}
    for (const pageID of pagesList) {
      pages[pageID] = db.pages[pageID]
    }

    return pages

  }



  render() {
    return (
      <main>
        <SideBar
        // for Account-Selector
          allUserList={this.state.allUserList}
        // for SBPageContent
          activeUser={this.state.activeUser}
        // for SideBar Handling
          sideBarClosed={this.state.sideBarClosed}
        // Functions
          switchUser={this.switchUser}
          closeSideBar={this.closeSideBar}
          getPages={this.getPages}
        />
        <MainView />
      </main>
    );
  }
}

export default App;

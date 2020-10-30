import React from 'react';
import SideBar from './Components/SideBar/SideBar'
import MainView from './Components/MainView/MainView'
import './AppStyle.css'

const db = {
  users: {
    mamaID: {
      name: "Mama",
      pages: {
        Housing: {
          Bed: {
            Manuel: ["Side Table", "Lights"],
            Sarah: ["Unterwäsche", "Kerze", "Strümpfe"]
          },
          Office: ["Computer", "Speakers"]
        },
        Animals: ["P2 Child1", "And one more child"],
        sportsAndGaming: ["P3Child 1", "p3 2", "the last of all"]
      },
      pageContents: {
        Housing: {
          Bed: {
            Manuel: ["Side Table", "Lights"],
            Sarah: ["Unterwäsche", "Kerze", "Strümpfe"]
          },
          Office: ["Computer", "Speakers"]
        },
        Animals: ["P2 Child1", "And one more child"],
        sportsAndGaming: ["P3Child 1", "p3 2", "the last of all"]
      }
    },
    
    papaID: {
      name: "Papa",
      pages: {
        Job: {
          Freelance: ["Ausgaben", "Einnahmen"]
        },
        Private: ["Wife", "Kids"]
      },
      pageContents: {
        Job: {
          Freelance: ["Ausgaben", "Einnahmen"]
        },
        Private: ["Wife", "Kids"]
      }
    },

    guestID: {
      name: "Guest",
      pages: {
        Welcome: ["Guest Page 1", "Some Public Access"]
      },
      pageContents: {
        Welcome: ["Guest Page 1", "Some Public Access"]
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      allUserList: [],
      activeUser: {empty: "empty"},
      sideBarClosed: false
    }

    this.switchUser = this.switchUser.bind(this)
    this.closeSideBar = this.closeSideBar.bind(this)
  }

  // Backend Simulator
  componentDidMount() {
    let dbUsers = []

    for (const userID of Object.keys(db.users)) {
      dbUsers.push({[userID]: db.users[userID].name})
    }

    this.setState({
      allUserList: dbUsers
    })
  }

  switchUser(event) {
    this.setState({
      activeUser: {
        [event.target.value]: db.users[event.target.value]
      }
    })
  }

  closeSideBar() {
    this.setState((state) => ({
      sideBarClosed: !state.sideBarClosed
    }))
  }



  render() {
    return (
      <main>
        <SideBar
          allUserList={this.state.allUserList}
          activeUser={this.state.activeUser}
          sideBarClosed={this.state.sideBarClosed}
          switchUser={this.switchUser}
          closeSideBar={this.closeSideBar}
        />
        <MainView />
      </main>
    );
  }
}

export default App;

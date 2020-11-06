import React, { createContext } from 'react';
import './AppStyle.css'
import { Route, Switch } from 'react-router-dom';
import Welcome from './Components/Public/Welcome';
import Login from './Components/Public/Login';
import Register from './Components/Public/Register';
import axios from 'axios'

export const UserContext = createContext({ authed: false, user: null, logIn: null, logOut: null })


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
  }


  componentDidMount() {

    axios.post('/data')
      .then(res => {
        console.log('RESULT FROM POST DATA :>> ', res)
        this.setState({
          authed: true,
          user: res.data.user
        })
      })
      .catch(error => console.log('error :>> ', error))

  }

  logIn() {
    this.setState({
      authed: true
    })
  }

  logOut() {
    this.setState({
      authed: false
    })
  }



  render() {
    return (
      <UserContext.Provider
        value={{
          authed: this.state.authed,
          user: this.state.user,
          logIn: this.logIn,
          logOut: this.logOut
        }}>
        {this.state.authed ? <span>Authed</span> : <span>Not Authed</span>}
        <main>
          <br></br>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>

          {/* <Switch>
          <Route exact path="/">
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
            <MainView getData={this.getData} />
          </Route>
          <Route path="/:page">
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
            <MainView getData={this.getData} />
          </Route>

        </Switch> */}
        </main>

      </UserContext.Provider>
    );
  }
}

export default App;

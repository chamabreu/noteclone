import React, { createContext } from 'react';
import './AppStyle.css'
import { Redirect, Route, Switch } from 'react-router-dom';
import Welcome from './Components/Public/Welcome';
import Login from './Components/Public/Login';
import Register from './Components/Public/Register';
import axios from 'axios'
import Internal from './Internal';

export const UserContext = createContext({ authed: false, user: null, data: null, logIn: null, logOut: null })


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authed: false,
      user: null,
      data: null
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
  }


  componentDidMount() {
    axios.post('/data')
      .then(res => {
        this.setState({
          authed: true,
          user: res.data.user,
          data: res.data.data
        })
      })
      .catch(error => console.log('error :>> ', error))
  }

  logIn() {
    axios.post('/data')
      .then(res => {
        this.setState({
          authed: true,
          user: res.data.user,
          data: res.data.data
        })
      })
      .catch(error => console.log('error :>> ', error))
  }

  logOut() {
    this.setState({
      authed: false
    })
  }



  render() {
    if (this.state.authed) {
      console.log("RENDER AUTHED")
      return (
        <Switch>
          <Route exact path='/'>
            <UserContext.Provider
              value={{
                authed: this.state.authed,
                user: this.state.user,
                data: this.state.data,
                logIn: this.logIn,
                logOut: this.logOut
              }}>
              <Internal />
            </UserContext.Provider>
          </Route>
          <Route><h1>Not Found</h1></Route>
        </Switch>

      )
    } else {
      console.log("NO AUTHED RENDER")
      return (
        <UserContext.Provider
          value={{
            authed: this.state.authed,
            user: this.state.user,
            logIn: this.logIn,
            logOut: this.logOut
          }}>
          {this.state.authed ? <span>Authed {this.state.user}</span> : <span>Not Authed</span>}
          <main>
            <br></br>
            <Switch>
              <Route exact path='/' component={Welcome} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route render={() => (<h1>Not found</h1>)} />
            </Switch>
          </main>
        </UserContext.Provider>

      );

    }
  }
}

export default App;

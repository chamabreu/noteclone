import React, { Fragment } from 'react';
import './AppStyle.css'
import { Link, Route, Switch } from 'react-router-dom';
import Welcome from './Components/Public/Welcome';
import Login from './Components/Public/Login';
import Register from './Components/Public/Register';
import axios from 'axios'
import Internal from './Internal';
import UserContext from './Context/UserContext'


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authed: false,
      user: null,
      data: null
    }
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.getData = this.getData.bind(this)
  }


  componentDidMount() {
    this.getData()
  }

  logIn(user) {
    this.setState({
      authed: true,
      user: user
    })
  }

  logOut() {
    axios.post('/logout')
      .then(res => {
        this.setState({
          authed: false,
          user: null,
          data: null
        })
      })
      .catch(error => {
        console.log('error :>> ', error);
      })
  }

  getData() {
    axios.post('/data')
      .then(res => {
        console.log("SUCCES MAIN /DATA")
        console.log('res.data :>> ', res.data);
        this.setState({
          authed: true,
          user: res.data.user,
          data: res.data.data,
          loading: false
        })

      })
      .catch(error => {
        this.setState({
          authed: false,
          user: null,
          data: null,
          loading: false
        })
        console.log('error :>> ', error)
      })
  }


  render() {
    if (this.state.loading) {
      return (
        null
      )
    } else if (this.state.authed) {
      return (
        <UserContext.Provider
          value={{
            user: this.state.user,
            data: this.state.data,
            getData: this.getData,
            logOut: this.logOut
          }}>
          <Internal />
        </UserContext.Provider>
      )
    } else {
      return (
        <UserContext.Provider
          value={{
            logIn: this.logIn,
          }}>
          <Switch>
            <Route exact path='/' component={Welcome} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route render={() => (<><h1>Not found</h1><Link to='/'>Welcome Page</Link></>)} />
          </Switch>
        </UserContext.Provider>

      );

    }
  }
}

export default App;

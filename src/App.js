import React from 'react';
import './AppStyle.css'
import { Link, Route, Switch } from 'react-router-dom';
import Welcome from './Components/Public/Welcome';
import Login from './Components/Public/Login';
import Register from './Components/Public/Register';
import axios from 'axios'
import Authed from './Components/Authed/Authed';
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
    this.updatePageName = this.updatePageName.bind(this)
  }


  componentDidMount() {
    this.getData()
  }

  logIn(user) {
    console.log('user :>> ', user);
    this.setState({
      authed: true,
      user: user
    })
  }

  logOut() {
    axios.post('/api/logout')
      .then(() => {
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
    axios.post('/api/data')
      .then(res => {
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

  updatePageName(pageID, newName) {
    // console.log('pageID :>> ', pageID);
    // console.log('newName :>> ', newName);
    axios.post('/api/updatePageName', {pageID: pageID, newName: newName})
      .then(res => {
        this.getData()
      })
      .catch(err => console.log('err :>> ', err))
      
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
            updatePageName: this.updatePageName,
            logOut: this.logOut
          }}>
          <Authed />
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
            <Route render={() => (<><h1>Not logged In</h1><Link to='/'>Welcome Page</Link></>)} />
          </Switch>
        </UserContext.Provider>

      );

    }
  }
}

export default App;

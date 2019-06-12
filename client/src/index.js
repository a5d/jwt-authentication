import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import ProfilePage from './pages/Profile'
import LogoutPage from './pages/Logout'
import Header from './components/Header'

class App extends Component {
  state = {
    auth: false
  }

  logIn = () => {
    this.setState({auth: true})
  }

  logOut = () => {
    this.setState({auth: false})
  }

  render() {
    const {auth} = this.state
    return (
      <BrowserRouter>
        <Header auth={auth} />
        <Switch>
          <Route exact path='/' render={() => <LoginPage onLogged={this.logIn} auth={auth} />} />
          <Route path='/signup' render={() => <SignupPage auth={auth} />} />
          <Route path='/profile' render={() => <ProfilePage auth={auth} />} />
          <Route path='/logout' render={() => <LogoutPage onLogouted={this.logOut} auth={auth} />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
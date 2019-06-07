import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import ProfilePage from "./pages/Profile";
import LogoutPage from "./pages/Logout";
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
    return <BrowserRouter>
      <Header auth={this.state.auth}/>
      <Switch>
        <Route exact path='/' render={() => <LoginPage onLogged={this.logIn} auth={this.state.auth}/>}/>
        <Route path='/registration' render={() => <RegistrationPage auth={this.state.auth}/>}/>
        <Route path='/profile' render={() => <ProfilePage auth={this.state.auth}/>}/>
        <Route path='/logout' render={() => <LogoutPage onLogouted={this.logOut} auth={this.state.auth}/>}/>
      </Switch>
    </BrowserRouter>
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
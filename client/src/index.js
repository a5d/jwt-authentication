import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginPage from "./pages/Login";
import RegistrationPage from "./pages/Registration";
import ProfilePage from "./pages/Profile";
import Header from './components/Header'

const App = () => {
  return <BrowserRouter>
    <Header/>
    <Switch>
      <Route exact path='/' component={LoginPage}/>
      <Route path='/registration' component={RegistrationPage}/>
      <Route path='/profile' component={ProfilePage}/>
    </Switch>
  </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById('app'))
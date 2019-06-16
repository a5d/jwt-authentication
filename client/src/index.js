import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import LoginPage from './containers/Login'
import SignupPage from './containers/Signup'
import ProfilePage from './pages/Profile'
import LogoutPage from './pages/Logout'
import Header from './components/Header'
import reducers from './reducers'

import './favicon.ico'

const store = createStore(reducers)

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' render={() => <LoginPage />} />
        <Route path='/signup' render={() => <SignupPage />} />
        <Route path='/profile' render={() => <ProfilePage />} />
        <Route path='/logout' render={() => <LogoutPage />} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('app'))
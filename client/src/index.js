import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import LoginPage from './containers/Login'
import SignupPage from './containers/Signup'
import ProfilePage from './pages/Profile'
import LogoutPage from './pages/Logout'
import Header from './components/Header'
import Auth from './containers/Auth'
import reducers from './reducers'
import ProtectedRouter from './containers/ProtectedRouter'

import './favicon.ico'

const store = createStore(reducers)

const App = hot(() => (
  <Provider store={store}>
    <BrowserRouter>
      <Auth>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <LoginPage />} />
          <Route path='/signup' render={() => <SignupPage />} />
          <ProtectedRouter path='/profile' render={() => <ProfilePage />} />
          <Route path='/logout' render={() => <LogoutPage />} />
        </Switch>
      </Auth>
    </BrowserRouter>
  </Provider>
))



ReactDOM.render(<App />, document.getElementById('app'))


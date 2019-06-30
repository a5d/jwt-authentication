import React from 'react'
import ReactDOM from 'react-dom'
import {hot} from 'react-hot-loader/root'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Loadable from 'react-loadable'

import Auth from './containers/Auth'
import reducers from './reducers'
import ProtectedRouter from './containers/ProtectedRouter'

import './favicon.ico'

const store = createStore(reducers)

const LoadableProfile = Loadable({
  loader: () => import('./pages/Profile'),
  loading() {
    return <div>Loading Profile...</div>
  }
})

const LoadableLogin = Loadable({
  loader: () => import('./containers/Login'),
  loading() {
    return <div>Loading Login...</div>
  }
})

const LoadableSignup = Loadable({
  loader: () => import('./containers/Signup'),
  loading() {
    return <div>Loading Signup...</div>
  }
})

const LoadableLogout = Loadable({
  loader: () => import('./pages/Logout'),
  loading() {
    return <div>Loading Logout...</div>
  }
})

const LoadableHeader = Loadable({
  loader: () => import('./components/Header'),
  loading() {
    return <div>Loading Header...</div>
  }
})

const App = hot(() => (
  <Provider store={store}>
    <BrowserRouter>
      <Auth>
        <LoadableHeader />
        <Switch>
          <Route exact path='/' render={() => <LoadableLogin />} />
          <Route path='/signup' render={() => <LoadableSignup />} />
          <ProtectedRouter path='/profile' render={() => <LoadableProfile />} />
          <Route path='/logout' render={() => <LoadableLogout />} />
        </Switch>
      </Auth>
    </BrowserRouter>
  </Provider>
))



ReactDOM.render(<App />, document.getElementById('app'))


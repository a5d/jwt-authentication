import React from 'react'
import ReactDOM from 'react-dom'
import {hot} from 'react-hot-loader/root'
import {BrowserRouter, Route, Switch, Link, withRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Loadable from 'react-loadable'

import Auth from './containers/Auth'
import reducers from './reducers'
import ProtectedRouter from './containers/ProtectedRouter'

import './favicon.ico'
import LayoutMd from "./components/LayoutMd";

const store = createStore(reducers)

const LoadableProfile = Loadable({
  loader: () => import('./pages/Profile'),
  loading() {
    return <div>Loading Profile...</div>
  }
})

const LoadableLogin = Loadable({
  loader: (): Promise<any> => import('./pages/LoginPage'),
  loading() {
    return <div>Loading Login...</div>
  }
})

const LoadableSignup = Loadable({
  loader: (): Promise<any> => import('./pages/SignupPage'),
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
    return <LayoutMd>Loading Header...</LayoutMd>
  }
})

const Page1 = () => {
  return <LayoutMd title="Page1">text</LayoutMd>
}

const Page2 = () => {
  return <LayoutMd title="Page2">Text</LayoutMd>
}

const Page3 = () => {
  return <LayoutMd title="Page3">
    <p>123</p>
    <p><Link to={{pathname: "/page4", state: {from: "page3"}}}>Back</Link></p>
  </LayoutMd>
}

const Page4 = withRouter((props: any) => {
  console.log(props)

  return (
    <LayoutMd title="Page4">
      <p><Link to={"/page3"}>Back</Link></p>
    </LayoutMd>
  )
})

const App = hot(() => (
  <Provider store={store}>
    <BrowserRouter>
      <Auth>
        <LoadableHeader/>
        <Switch>
          <Route exact path='/' render={() => <LoadableLogin/>}/>
          <Route path='/signup' render={() => <LoadableSignup/>}/>
          <Route path='/page1' render={() => <Page1/>}/>
          <Route path='/page2' render={() => <Page2/>}/>
          <Route path='/page3' render={() => <Page3/>}/>
          <Route path='/page4' render={(props) => <Page4 {...props} />}/>
          <ProtectedRouter path='/profile' render={() => <LoadableProfile/>}/>
          <Route path='/logout' render={() => <LoadableLogout/>}/>
        </Switch>
      </Auth>
    </BrowserRouter>
  </Provider>
))

ReactDOM.render(<App/>, document.getElementById('app'))


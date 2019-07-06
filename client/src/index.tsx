import React from 'react'
import ReactDOM from 'react-dom'
import {hot} from 'react-hot-loader/root'
import {BrowserRouter, Route, Switch, Link, withRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import Lazy from './containers/Lazy'

import Auth from './containers/Auth'
import reducers from './reducers'
import ProtectedRouter from './containers/ProtectedRouter'

import './favicon.ico'
import LayoutMd from "./components/LayoutMd";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./pages/NewsPage";

const store = createStore(reducers)

const Header = Lazy((): Promise<any> => import("./components/Header"), "Login")
const LoginPage = Lazy((): Promise<any> => import("./pages/LoginPage"), "Login")
const SignupPage = Lazy((): Promise<any> => import("./pages/SignupPage"), "Signup")
const LogoutPage = Lazy((): Promise<any> => import("./pages/Logout"), "Logout")
const ProfilePage = Lazy((): Promise<any> => import("./pages/Profile"), "Profile")

const ContactsPage = withRouter((props: any) => {
  return (
    <LayoutMd title="Contacts">
      <p><Link to={"/news"}>News</Link></p>
    </LayoutMd>
  )
})

const App = hot(() => (
  <Provider store={store}>
    <BrowserRouter>
      <Auth>
        <Header/>
        <Switch>
          <Route exact path='/' render={() => <HomePage/>}/>
          <Route path='/about' render={() => <AboutPage/>}/>
          <Route path='/news' render={() => <NewsPage/>}/>
          <Route path='/contacts' render={(props) => <ContactsPage {...props} />}/>
          <ProtectedRouter path='/profile' render={() => <ProfilePage/>}/>
          <Route path='/signup' render={() => <SignupPage/>}/>
          <Route path='/login' render={() => <LoginPage/>}/>
          <Route path='/logout' render={() => <LogoutPage/>}/>
        </Switch>
      </Auth>
    </BrowserRouter>
  </Provider>
))

ReactDOM.render(<App/>, document.getElementById('app'))


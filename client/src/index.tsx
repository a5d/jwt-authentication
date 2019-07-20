import React from 'react';
import ReactDOM from 'react-dom';
// tslint:disable-next-line:no-implicit-dependencies no-submodule-imports
import {hot} from 'react-hot-loader/root';
import Loadable from 'react-loadable';
import {Provider} from 'react-redux';
import {Link, Route, RouteComponentProps, Router, Switch, withRouter} from 'react-router-dom';
import LayoutMd from './components/LayoutMd';
import Auth from './containers/Auth';
import Lazy from './containers/Lazy';
import ProtectedRouter from './containers/ProtectedRouter';
// tslint:disable-next-line:no-import-side-effect
import './favicon.ico';
import history from './history';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import {store} from './store';

history.listen(({ pathname }) => {
  window.scrollTo(0, 0);
});

interface IMatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
}

interface IMatchParamsBuy {
  id: string;
  action: string;
}

interface IPropsBuy extends RouteComponentProps<IMatchParamsBuy> {
}

const Header = Lazy((): Promise<any> => import(/* webpackChunkName: "Header" */ './components/Header'), 'Login');
const LoginPage = Lazy((): Promise<any> => import(/* webpackChunkName: "LoginPage" */'./pages/LoginPage'), 'Login');
const SignupPage = Lazy((): Promise<any> => import(/* webpackChunkName: "SignupPage" */'./pages/SignupPage'), 'Signup');
const LogoutPage = Lazy((): Promise<any> => import(/* webpackChunkName: "Logout" */'./pages/Logout'), 'Logout');
const ProfilePage = Lazy((): Promise<any> => import(/* webpackChunkName: "Profile" */'./pages/Profile'), 'Profile');

const ProductPage = Loadable({
  loader: () => import(/* webpackChunkName: "ProductPage" */'./pages/ProductPage'),
  loading: () => <div>ProductPage</div>,
});

const EditProductPage = Loadable({
  loader: () => import(/* webpackChunkName: "EditProductPage" */'./pages/EditProductPage'),
  loading: () => <div>EditProductPage</div>,
});

const NewProductPage = Loadable({
  loader: () => import(/* webpackChunkName: "NewProductPage" */'./pages/NewProductPage'),
  loading: () => <div>NewProductPage</div>,
});

const ContactsPage = withRouter((props: any) => {
  return (
    <LayoutMd title="Contacts">
      <p><Link to={'/news'}>News</Link></p>
    </LayoutMd>
  );
});

const App = hot(() => (
  <Provider store={store}>
    <Router history={history}>
      <Auth>
        <Header/>
        <Switch>
          <Route exact={true} path="/" render={HomePage}/>
          <Route path="/about" render={() => <AboutPage/>}/>
          <Route path="/news" render={() => <NewsPage/>}/>
          <Route path="/contacts" render={(props) => <ContactsPage {...props} />}/>
          <ProtectedRouter path="/profile" render={() => <ProfilePage/>}/>
          <Route path="/signup" render={() => <SignupPage/>}/>
          <Route path="/login" render={() => <LoginPage/>}/>
          <Route path="/logout" render={() => <LogoutPage/>}/>
          <Route exact={true} path="/product/:id" render={({match}: IProps) => <ProductPage id={match.params.id}/>}/>
          <ProtectedRouter path="/product/:id/edit" render={(props) => <EditProductPage {...props} />}/>
          <ProtectedRouter path="/category/:id/new-product"
                 render={({match}: IPropsBuy) => <NewProductPage id={match.params.id}/>}/>
        </Switch>
      </Auth>
    </Router>
  </Provider>
));

ReactDOM.render(<App/>, document.getElementById('app'));

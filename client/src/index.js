import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'auth': false,
      'email': '',
      'password': ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(e) {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  submitForm(e) {
    e.preventDefault()
    this.setState({'auth': true})
  }

  cancelForm() {
    this.setState({'auth': false})
  }

  render() {
    const {email, password} = this.state

    if (this.state.auth === false) {
      return <div>
        <form onSubmit={this.submitForm}>
          <p>
            <input
              name='email'
              onChange={this.updateInput}
              placeholder='E-mail'
              type="text"
              value={email}
            />
          </p>
          <p><input
            name='password'
            onChange={this.updateInput}
            placeholder='Пароль'
            type="password"
            value={password}
          /></p>
          <p>
            <button type="submit">Отправить</button>
          </p>
        </form>
        <p><Link to='/registration'>Registration</Link></p>
      </div>
    }

    return <div>
      <p>Отправлено</p>
      <p>
        <button onClick={this.cancelForm}>Назад</button>
      </p>
    </div>
  }
}


class RegistrationPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'auth': true,
      'email': '',
      'password': ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(e) {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  submitForm(e) {
    e.preventDefault()
    this.setState({'auth': true})
  }

  render() {
    const {email, password, auth} = this.state

    if (auth === false) {
      return <div>Already registered</div>

    }

    return <div>
      <p>Registration Page</p>
      <form onSubmit={this.submitForm}>
        <p>
          <input
            name='email'
            onChange={this.updateInput}
            placeholder='E-mail'
            type="text"
            value={email}
          />
        </p>
        <p><input
          name='password'
          onChange={this.updateInput}
          placeholder='Пароль'
          type="password"
          value={password}
        /></p>
        <p>
          <button type="submit">Отправить</button>
        </p>
      </form>
      <p><Link to='/'>Login</Link></p>
    </div>
  }

}

const ProfilePage = () => {
  return <div>
    <p>Profile Page</p>
    <p><Link to='/'>Login</Link></p>
  </div>
}

const App = () => {
  return <BrowserRouter>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/registration'>Registration</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route exact path='/' component={LoginPage}/>
      <Route path='/registration' component={RegistrationPage}/>
      <Route path='/profile' component={ProfilePage}/>
    </Switch>
  </BrowserRouter>
}

ReactDOM.render(<App/>, document.getElementById('app'))
import React, {Component} from 'react'
import {Link} from "react-router-dom";

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

export default RegistrationPage
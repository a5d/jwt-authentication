import React, {Component} from 'react'
import {Link} from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'auth': false,
      'email': '123',
      'password': '123',
      'error': ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(e) {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  submitForm(e) {
    const {email, password} = this.state

    e.preventDefault()

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {'content-type': 'application/json'}
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          this.setState({...data})
        } else {
          this.setState({auth: true})
          this.props.onLogged()
        }

      })
      .catch(e => console.error(e));
  }

  cancelForm() {
    this.setState({'auth': false})
  }

  render() {
    const {email, password, error} = this.state
    const {auth} = this.props

    if (auth === false) {
      return <div>
        <p>{error}</p>
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
      </div>
    }

    return <div>
      <p>Вы вошли</p>
    </div>
  }
}

export default LoginPage
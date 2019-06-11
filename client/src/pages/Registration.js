import React, {Component} from 'react'
import {Link} from "react-router-dom";

class RegistrationPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'complete': false,
      'error': '',
      'email': '123',
      'password': '123'
    }

    this.submitForm = this.submitForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(e) {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  submitForm(e) {
    e.preventDefault()

    const {email, password} = this.state

    fetch('http://localhost:8082/api/signup', {
      method: 'POST',
      credentials: "include",
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
          this.setState({complete: true})
        }

      })
      .catch(e => console.error(e));
  }

  render() {
    const {email, password, complete, error} = this.state
    const {auth} = this.props

    if (complete === true) {
      return <p>Регистрация завершена</p>
    }

    if (auth === true) {
      return <p>Вы уже зарегистрированы</p>

    }

    return <div>
      <h3>Registration Page</h3>
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
}

export default RegistrationPage

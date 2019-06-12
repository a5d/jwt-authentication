import React, {Component} from 'react'
import PropTypes from 'prop-types'
import signupService from '../service/Signup'

class SignupPage extends Component {
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

    signupService({password, email})
      .then(data => {
        if (data.error) {
          this.setState({...data})
        } else {
          this.setState({complete: true})
        }

      })
      .catch(console.error)
  }

  render() {
    const {email, password, complete, error} = this.state
    const {auth} = this.props

    if (complete) {
      return <p>Регистрация завершена</p>
    }

    if (auth) {
      return <p>Вы уже зарегистрированы</p>

    }

    return (
      <div>
        <h3>Signup</h3>
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
          />
          </p>
          <p>
            <button type="submit">Отправить</button>
          </p>
        </form>
      </div>
    )
  }
}

SignupPage.propTypes = {
  auth: PropTypes.bool.isRequired
}

export default SignupPage
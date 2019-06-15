import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import loginService from '../service/Login'
import Login from '../pages/Login'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'email': '123',
      'password': '123',
      'error': ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(e) {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  submitForm(e) {
    const {email, password} = this.state
    const {onLogged} = this.props

    e.preventDefault()

    loginService({password, email})
      .then(data => {
        if (data.error) {
          this.setState({...data})
        } else {
          onLogged()
        }

      })
      .catch(console.error)
  }

  render() {
    const {auth} = this.props

    if (auth) {
      return (
        <div>
          <p>Вы вошли</p>
        </div>
      )
    }

    return <Login {...this.state} onSubmit={this.submitForm} updateInput={this.updateInput} />
  }
}

LoginPage.propTypes = {
  auth: PropTypes.bool.isRequired,
  onLogged: PropTypes.func.isRequired,
}

export default LoginPage
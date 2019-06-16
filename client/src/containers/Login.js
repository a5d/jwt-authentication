import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {Container, CssBaseline, Link as MUILink} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {Link} from 'react-router-dom'

import loginService from '../service/Login'
import Form from '../pages/Form'

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
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <p>Вы вошли</p>
        </Container>
      )
    }

    return (
      <Form
        {...this.state}
        onSubmit={this.submitForm}
        updateInput={this.updateInput}
        name="Sign in"
        icon={<LockOutlined />}
        link={(
          <MUILink component={Link} to="/signup" variant="body2">
            {'Don\'t have an account? Sign up'}
          </MUILink>
        )}
      />
    )
  }
}

LoginPage.propTypes = {
  auth: PropTypes.bool.isRequired,
  onLogged: PropTypes.func.isRequired,
}

export default LoginPage
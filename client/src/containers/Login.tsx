import React, {ChangeEvent, Component, FormEvent} from 'react'
import {connect} from 'react-redux'
import {Container, CssBaseline, Link as MUILink} from '@material-ui/core'
import {LockOutlined} from '@material-ui/icons'
import {Link} from 'react-router-dom'
import {logIn} from '../actions'

import loginService from '../service/Login'
import LoginForm from '../pages/loginForm'
import validateEmail from '../service/validateEmail'

interface Props {
  logIn: () => void,
  auth: boolean
}

interface State {
  email?: string,
  password?: string,
  error?: string,
  emailError?: string,
  passwordError?: string
}

interface Page {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  updateInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

class LoginPage extends Component<Props, State, Page> {
  constructor(props: Props) {
    super(props)

    this.state = {
      'email': '',
      'password': '',
      'error': '',
      'emailError': '',
      'passwordError': '',
    }

    this.submitForm = this.submitForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  updateInput(e: ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.currentTarget
    this.setState({[name]: value})
  }

  validateForm() {
    const {email, password} = this.state
    let sendForm = true;

    if (email) {
      if (!validateEmail(email)) {
        this.setState({emailError: 'Wrong email'})
        sendForm = false
      } else {
        this.setState({emailError: ''})
      }
    }

    if (password) {
      if (password.length < 5 || password.length > 10) {
        this.setState({passwordError: 'Wrong password length 5-10'})
        sendForm = false
      } else {
        this.setState({passwordError: ''})
      }
    }

    return sendForm
  }

  submitForm(e: FormEvent<HTMLFormElement>) {
    const {email, password} = this.state
    const {logIn} = this.props

    e.preventDefault()

    if (this.validateForm()) {
      loginService({password, email})
        .then(data => {
          if (data.error) {
            this.setState({error: data.error})
          } else {
            logIn()
          }
        })
        .catch(console.error)
    }
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
      <LoginForm
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

const mapStateToProps = ({auth}: Props) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, {logIn})(LoginPage)

import React, {ChangeEvent, Component, FormEvent} from 'react'
import {connect} from 'react-redux'
import * as PropTypes from 'prop-types'
import {Face} from '@material-ui/icons'
import {Container, CssBaseline, Link as MUILink} from '@material-ui/core'
import {Link} from 'react-router-dom'
import signupService from '../service/Signup'
import LoginForm from '../pages/loginForm'

import validateEmail from '../service/validateEmail'

export interface Props {
  auth?: boolean
}

interface State {
  complete?: boolean,
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

class SignupPage extends Component<Props, State, Page> {
  constructor(props: Props) {
    super(props)

    this.state = {
      'complete': false,
      'error': '',
      'email': '',
      'password': '',
      'emailError': '',
      'passwordError': '',
    }

    this.submitForm = this.submitForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  updateInput(e: ChangeEvent<HTMLInputElement>) {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
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
    e.preventDefault()

    const {email, password} = this.state

    if (this.validateForm()) {
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
  }

  render() {
    const {complete} = this.state
    const {auth} = this.props

    if (complete) {
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <p>Регистрация завершена</p>
        </Container>
      )
    }


    if (auth) {
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <p>Вы уже зарегистрированы</p>
        </Container>
      )

    }

    return (
      <LoginForm
        {...this.state}
        onSubmit={this.submitForm}
        updateInput={this.updateInput}
        name="Sign up"
        icon={<Face />}
        link={(
          <MUILink component={Link} to="/" variant="body2">
            {'Do you have an account? Sign in'}
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

export default connect(mapStateToProps)(SignupPage)

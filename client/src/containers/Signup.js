import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import {Face} from '@material-ui/icons'
import {Container, CssBaseline, Link as MUILink} from '@material-ui/core'
import {Link} from 'react-router-dom'
import signupService from '../service/Signup'
import Form from '../pages/Form'

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
      <Form
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

SignupPage.propTypes = {
  auth: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(SignupPage)

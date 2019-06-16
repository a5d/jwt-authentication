import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
import {Container, CssBaseline} from '@material-ui/core'
import {logOut} from '../actions'

import logoutService from '../service/Logout'

class LogoutPage extends Component {
  componentDidMount() {
    this.userLogOut()
  }

  userLogOut() {
    const {logOut} = this.props

    logoutService()
      .then(data => {
        if (data.error) {
          console.error(data.error)
        } else {
          logOut()
        }

      })
      .catch(console.error)
  }

  render() {
    const {auth} = this.props

    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        {(auth) ? <p>Выход...</p> : <p>Вы вышли</p>}
      </Container>
    )
  }
}

LogoutPage.propTypes = {
  auth: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logOut})(LogoutPage)

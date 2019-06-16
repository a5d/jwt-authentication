import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {Container, CssBaseline} from '@material-ui/core'

import logoutService from '../service/Logout'

class LogoutPage extends Component {
  componentDidMount() {
    this.logOut()
  }

  logOut() {
    const {onLogouted} = this.props

    logoutService()
      .then(data => {
        if (data.error) {
          console.error(data.error)
        } else {
          onLogouted()
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
  onLogouted: PropTypes.func.isRequired,
};

export default LogoutPage

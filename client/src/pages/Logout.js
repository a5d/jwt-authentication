import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
    if (auth) {
      return (
        <div>
          <p>Выход...</p>
        </div>
      )
    }

    return (
      <div>
        <p>Вы вышли</p>
      </div>
    )
  }
}

LogoutPage.propTypes = {
  auth: PropTypes.bool.isRequired,
  onLogouted: PropTypes.func.isRequired,
};

export default LogoutPage

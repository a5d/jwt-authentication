import React, {Component} from 'react'
import PropTypes from 'prop-types'
import profileService from '../service/Profile'

class ProfilePage extends Component {
  state = {
    profile: {},
    error: ''
  }

  componentDidMount() {
    const {auth} = this.props

    if (auth) {
      profileService()
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            this.setState({...data})
          } else {
            this.setState({profile: data})
          }

        })
        .catch(console.error)
    }
  }

  render() {
    const {error, profile} = this.state

    return (
      <div>
        <p>Profile Page</p>
        <p>{error}</p>
        <p>{JSON.stringify(profile)}</p>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  auth: PropTypes.bool.isRequired
}

export default ProfilePage

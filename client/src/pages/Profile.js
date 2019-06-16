import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {Container, CssBaseline} from '@material-ui/core'

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
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <h2>Profile Page</h2>
        <p>{error}</p>
        <p>{JSON.stringify(profile)}</p>
      </Container>
    )
  }
}

ProfilePage.propTypes = {
  auth: PropTypes.bool.isRequired
}

export default ProfilePage

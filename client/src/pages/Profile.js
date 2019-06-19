import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, CssBaseline} from '@material-ui/core'

import profileService from '../service/Profile'

class ProfilePage extends Component {
  state = {
    profile: false,
    error: ''
  }

  componentDidMount() {
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

  render() {
    const {error, profile} = this.state

    if (profile) {
      return (
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <h2>Profile Page</h2>
          <p>{error}</p>
          <p>{JSON.stringify(profile)}</p>
        </Container>
      )
    }

    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <h2>Profile Page</h2>
        <p>Loading...</p>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(ProfilePage)

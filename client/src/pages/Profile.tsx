import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, CssBaseline} from '@material-ui/core'

import profileService from '../service/Profile'

interface State {
    profile?: object
}

interface Props {
    auth?: boolean
}

class ProfilePage extends Component<State> {
  public state = {
    profile: false,
    error: ''
  }

  public componentDidMount() {
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

  public render() {
    const {error, profile} = this.state

    if (profile || error) {
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

const mapStateToProps = ({auth}: Props) => ({auth})

export default connect(mapStateToProps)(ProfilePage)

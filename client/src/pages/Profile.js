import React, {Component} from 'react'
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
        .catch(console.error);
    }
  }

  render() {
    const {error} = this.state

    return <div>
      <p>Profile Page</p>
      <p>{error}</p>
      <p>{JSON.stringify(this.state.profile)}</p>
    </div>
  }
}

export default ProfilePage

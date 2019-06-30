import React, {Component} from 'react'
import {connect} from 'react-redux'
import checkAuth from '../service/Check'
import {logIn} from '../actions'

interface Props {
  logIn: () => void
}

class Auth extends Component<Props> {
  state = {
    loaded: false
  }

  componentDidMount() {
    const {logIn} = this.props

    checkAuth().then(data => {
      if (!data.error) {
        logIn()
      }
      this.setState({loaded: true})
    })
      .catch(e => {
        this.setState({loaded: true})
        console.error(e)
      })
  }

  render() {
    const {children} = this.props
    const {loaded} = this.state

    if (loaded) {
      return children
    }

    return <div>Loading...</div>
  }
}

export default connect(null, {logIn})(Auth)

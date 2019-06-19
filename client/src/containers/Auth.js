import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as PropTypes from 'prop-types'
import checkAuth from '../service/Check'
import {logIn} from '../actions'

class Auth extends Component {
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

Auth.propTypes = {
  children: PropTypes.node.isRequired,
  logIn: PropTypes.func.isRequired
}

export default connect(null, {logIn})(Auth)

import React from 'react'
import {connect,} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import * as PropTypes from 'prop-types'

const ProtectedRouter = ({render, auth, ...rest}) => {
  const renderFunc = auth ? render : () => <Redirect to='/' />

  return (
    <Route
      {...rest}
      render={renderFunc}
    />
  )
}

ProtectedRouter.propTypes = {
  render: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(ProtectedRouter)

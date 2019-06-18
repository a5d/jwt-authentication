import React from 'react'
import {connect,} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import * as PropTypes from 'prop-types'

const ProtectedRouter = ({component: Component, auth, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        auth ? <Component {...props} /> : <Redirect to='/' />
      )}
    />
  )
}

ProtectedRouter.propTypes = {
  component: PropTypes.element.isRequired,
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(ProtectedRouter)

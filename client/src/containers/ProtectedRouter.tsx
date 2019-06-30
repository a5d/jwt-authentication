import React from 'react'
import {connect,} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

interface Props {
  render: () => JSX.Element,
  path: string,
  auth: boolean
}

interface State {
  auth: boolean
}

const ProtectedRouter = ({render, auth, ...rest}: Props) => {
  const renderFunc = auth ? render : () => <Redirect to='/' />

  return (
    <Route
      {...rest}
      render={renderFunc}
    />
  )
}

const mapStateToProps = (state : State) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(ProtectedRouter)

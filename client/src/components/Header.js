import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as PropTypes from 'prop-types'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import useStyles from './Header.css'
import MenuLink from './MenuLink'


const Header = (props) => {
  const {auth} = props
  const classes = useStyles()

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar>
        <Typography component={Link} to="/" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          React auth with JWT
        </Typography>
        <nav>
          {auth ? <MenuLink to="/profile">Profile</MenuLink>
            : <><MenuLink to="/">Signin</MenuLink><MenuLink to="/signup">Signup</MenuLink></>}
          {auth && <MenuLink to="/logout">Logout</MenuLink>}
        </nav>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)

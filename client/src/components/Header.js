import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {AppBar, Toolbar, Typography, Link as MUILink} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import * as PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      padding: 0,
      margin: 0
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flexGrow: 1,
    textDecoration: 'none'
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}))

const MenuLink = (props) => {
  const classes = useStyles()
  const {to, children} = props

  return (
    <MUILink
      component={Link}
      to={to}
      variant="button"
      color="textPrimary"
      className={classes.link}
    >{children}
    </MUILink>
  )
}

MenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

const Header = (props) => {
  const {auth} = props
  const classes = useStyles()

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar>
        <Typography component={Link} to="/" variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          React auth with JWT 1
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

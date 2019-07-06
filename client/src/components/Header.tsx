import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import useStyles from './Header.css'
import MenuLink from './MenuLink'

interface Props {
  auth?: boolean
}

const Header = (props: Props) => {
  const {auth} = props
  const classes = useStyles()

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link className={classes.logo} to="/" >Site name</Link>
        </Typography>
        <nav>
          <MenuLink to="/">Home</MenuLink>
          <MenuLink to="/about">About</MenuLink>
          <MenuLink to="/news">News</MenuLink>
          <MenuLink to="/contacts">Contacts</MenuLink>
          {auth ? <MenuLink to="/profile">Profile</MenuLink>
            : <><MenuLink to="/login">Signin</MenuLink><MenuLink to="/signup">Signup</MenuLink></>}
          {auth && <MenuLink to="/logout">Logout</MenuLink>}
        </nav>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({auth}: Props) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Header)

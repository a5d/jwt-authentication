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
          <Link className={classes.logo} to="/" >React auth with JWT</Link>
        </Typography>
        <nav>
          <MenuLink to="/page1">Page1</MenuLink>
          <MenuLink to="/page2">Page2</MenuLink>
          <MenuLink to="/page3">Page3</MenuLink>
          <MenuLink to="/page4">Page4</MenuLink>
          {auth ? <MenuLink to="/profile">Profile</MenuLink>
            : <><MenuLink to="/">Signin</MenuLink><MenuLink to="/signup">Signup</MenuLink></>}
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

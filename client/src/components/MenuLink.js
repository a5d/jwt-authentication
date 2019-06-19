import React from 'react'
import {Link} from 'react-router-dom'
import {Link as MUILink} from '@material-ui/core'
import * as PropTypes from 'prop-types'

import useStyles from './Header.css'

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

export default MenuLink

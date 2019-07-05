import React from 'react'
import {Link} from 'react-router-dom'
import {Link as MUILink} from '@material-ui/core'

import useStyles from './Header.css'

interface Props {
  to: string,
  children: string | JSX.Element
}

const MenuLink = (props: Props) => {
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

export default MenuLink

import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const Header = (props) => {
  const {auth} = props
  return (
    <nav>
      <Link to='/'>Home</Link> |
      {(!auth) ? <span><Link to='/signup'>Signup</Link></span> :
      <span><Link to='/profile'>Profile</Link> | </span>}
      {(auth) ? <span><Link to='/logout'>Logout</Link></span> : ''}
    </nav>
  )
}

Header.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default Header
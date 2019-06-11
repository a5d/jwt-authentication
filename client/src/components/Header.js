import React from 'react'
import {Link} from "react-router-dom";

const Header = (props) => {
  return <nav>
    <Link to='/'>Home</Link> |
    {(props.auth === false) ? <span><Link to='/signup'>Signup</Link></span> :
      <span><Link to='/profile'>Profile</Link> | </span>}
    {(props.auth === true) ? <span><Link to='/logout'>Logout</Link></span> : ''}
  </nav>
}

export default Header
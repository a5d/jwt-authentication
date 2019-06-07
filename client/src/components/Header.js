import React from 'react'
import {Link} from "react-router-dom";

const Header = () => {
  return <nav>
    <Link to='/'>Home</Link> |
    <Link to='/registration'>Registration</Link> |
    <Link to='/profile'>Profile</Link>
  </nav>
}

export default Header
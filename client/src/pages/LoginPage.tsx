import React, {Component} from 'react'

import LoginForm from '../components/LoginForm'
import LayoutMd from "../components/LayoutMd";

class LoginPage extends Component {
  render() {
    return (
      <LayoutMd>
        <LoginForm/>
      </LayoutMd>
    )
  }
}

export default LoginPage

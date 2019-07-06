import React, {Component} from 'react'

import SignupForm from '../components/SignupForm'
import LayoutMd from "../components/LayoutMd";
import Loadable from "react-loadable";

class SignupPage extends Component {
  render() {
    return (
      <LayoutMd>
        <SignupForm/>
      </LayoutMd>
    )
  }
}

export default SignupPage

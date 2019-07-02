import {LockOutlined} from "@material-ui/icons";
import {Link as MUILink} from "@material-ui/core";
import {Link} from "react-router-dom";
import React from "react";
import Form from "../components/Form";
import {connect} from "react-redux";
import {logIn} from "../actions";
import {Props, withData} from "../containers/withData";
import loginService from "../service/Login";

const LoginForm = (props: Props) => {
  const {auth, submitForm, updateInput} = props

  if (auth) {
    return (
      <p>Вы вошли</p>
    )
  }

  return <Form
    onSubmit={submitForm}
    updateInput={updateInput}
    name="Sign in"
    icon={<LockOutlined/>}
    link={(
      <MUILink component={Link} to="/signup" variant="body2">
        {'Don\'t have an account? Sign up'}
      </MUILink>
    )}
  />
}

const mapStateToProps = ({auth}: Props) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, {logIn})(withData(LoginForm, loginService))
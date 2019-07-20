import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Face} from '@material-ui/icons';
import {Link as MUILink} from '@material-ui/core';
import {Link} from 'react-router-dom';
import signupService from '../service/Signup';

import Form from '../components/Form';
import {withData, Props, State, Page} from '../containers/withData';

class SignupForm extends Component<Props, State, Page> {
  render() {
    const {auth, complete, submitForm, updateInput} = this.props;

    if (complete) {
      return (
        <p>Регистрация завершена</p>
      );
    }

    if (auth) {
      return (
        <p>Вы уже зарегистрированы</p>
      );
    }

    return (
      <Form
        onSubmit={submitForm}
        updateInput={updateInput}
        name="Sign up"
        icon={<Face/>}
        link={(
          <MUILink component={Link} to="/" variant="body2">
            {'Do you have an account? Sign in'}
          </MUILink>
        )}
      />
    );
  }
}


const mapStateToProps = ({auth}: Props) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(withData(SignupForm, signupService));

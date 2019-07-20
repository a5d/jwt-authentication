import {Link as MUILink} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import React, {ChangeEvent, Component, FormEvent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logIn} from '../actions';
import Form from '../components/Form';
import validateEmail from '../service/validateEmail';
import {ILoginData} from './Model';

interface IStateProps {
  auth?: boolean;
  logIn: (payload: ILoginData) => void;
}

/**
 * Состояние компонента
 */
interface IStateWithData {
  email?: string;
  password?: string;
  error?: string;
  emailError?: string;
  passwordError?: string;
}


class LoginForm extends Component<IStateProps, IStateWithData> {
  state = {
    email: '',
    emailError: '',
    error: '',
    password: '',
    passwordError: '',
  };

  updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    this.setState({[name]: value});
  }

  validateForm = () => {
    const {email, password} = this.state;
    let sendForm = true;

    if (email) {
      if (!validateEmail(email)) {
        this.setState({emailError: 'Wrong email'});
        sendForm = false;
      } else {
        this.setState({emailError: ''});
      }
    }

    if (password) {
      if (password.length < 5 || password.length > 10) {
        this.setState({passwordError: 'Wrong password length 5-10'});
        sendForm = false;
      } else {
        this.setState({passwordError: ''});
      }
    }

    return sendForm;
  }

  submitForm = (e: FormEvent<HTMLFormElement>) => {
    const {email, password} = this.state;
    const {logIn} = this.props;

    e.preventDefault();

    if (this.validateForm()) {
      logIn({email, password});
    }
  }

  render() {
    const {auth} = this.props;

    if (auth) {
      return (
        <p>Вы вошли</p>
      );
    }

    return <Form
      onSubmit={this.submitForm}
      updateInput={this.updateInput}
      name="Sign in"
      icon={<LockOutlined/>}
      link={(
        <MUILink component={Link} to="/signup" variant="body2">
          {'Don\'t have an account? Sign up'}
        </MUILink>
      )}
    />;
  }
}

const mapStateToProps = ({auth}: IStateProps) => {
  return {
    auth
  };
};

export default connect(mapStateToProps, {logIn})(LoginForm);

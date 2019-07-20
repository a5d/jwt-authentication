import {Container, CssBaseline} from '@material-ui/core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logOut} from '../actions';

interface IStateProps {
  auth?: boolean;

}

interface IDispatchToProps {
  logOut: () => void;
}

type TProps = IStateProps & IDispatchToProps;

class LogoutPage extends Component<TProps> {
  componentDidMount() {
    this.userLogOut();
  }

  userLogOut() {
    const {logOut} = this.props;
    logOut();
  }

  render() {
    const {auth} = this.props;

    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        {(auth) ? <p>Выход...</p> : <p>Вы вышли</p>}
      </Container>
    );
  }
}

const mapStateToProps = (state: IStateProps) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {logOut})(LogoutPage);

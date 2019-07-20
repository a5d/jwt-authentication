import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkAuth} from '../actions';

interface IProps {
  checkAuth: () => void;
}

interface IState {
  loaded: boolean;
}

class Auth extends Component<IProps, IState> {
  componentDidMount() {
    const {checkAuth} = this.props;
    checkAuth();
  }

  render() {
    const {children} = this.props;
    return children;
  }
}

export default connect(null, {checkAuth})(Auth);

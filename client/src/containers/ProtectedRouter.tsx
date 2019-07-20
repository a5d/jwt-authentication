import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

interface IProps {
  render: () => JSX.Element;
  path: string;
  auth: boolean;
}

interface IState {
  auth: boolean;
}

const ProtectedRouter = ({render, auth, ...rest}: IProps) => {
  const renderFunc = auth ? render : () => <Redirect to="/" />;

  return (
    <Route
      {...rest}
      render={renderFunc}
    />
  );
};

const mapStateToProps = (state: IState) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ProtectedRouter);

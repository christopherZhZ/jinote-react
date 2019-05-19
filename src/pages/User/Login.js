import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import CenterView from 'react-center';
import LoginForm from '@/components/Login';
import { getUser } from '@/utils/authentication';

@connect(({ user, loading }) => ({
  userLoading: loading.models.user,
}))
class Login extends Component {
  constructor() {
    super();
    if (getUser()) {
      router.push('/jinote');
    }
  }

  handleLogin = (name, password, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/login',
      payload: { name, password },
    }).then(callback);
  };

  render() {
    return (
      <CenterView>
        <LoginForm
          {...this.props}
          handleLogin={this.handleLogin}
        />
      </CenterView>
    );
  }
}

export default Login;

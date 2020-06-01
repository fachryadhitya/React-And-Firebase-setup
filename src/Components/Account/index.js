import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeBase from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
      <h1>Account: {authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeBase />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser

export default withAuthorization(condition)(Account);
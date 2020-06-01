import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../../Constants/routes'
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  username: "",
  error: null,
};

const PasswordForgetPage = () => (
  <div>
    <h1>Forgot Password</h1>
    <PasswordForgetForm />
  </div>
);

class PasswordForgetBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          type="email"
          onChange={this.onChange}
          placeholder="Email"
        />
        <button type='submit' disabled={isInvalid}>Reset My Password</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => {
  return (
    <p>
      Forgot Password? <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
    </p>
  )
}

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetBase)

export {PasswordForgetLink, PasswordForgetForm}

import React, { Component } from "react";
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};


class PasswordChangeBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate( passwordOne)
      .then(() => {
        this.setState({
          ...INITIAL_STATE,
        });
        console.log("Success change password")
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {  passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      passwordTwo === ""

    return (
      <form onSubmit={this.onSubmit}>
    
        <input
          name="passwordOne"
          value={passwordOne}
          type="password"
          placeholder="Password"
          onChange={this.onChange}
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          type="password"
          placeholder="Confirm Your Password"
          onChange={this.onChange}
        />
        <button type="submit" disabled={isInvalid} >Change My Password</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeBase);

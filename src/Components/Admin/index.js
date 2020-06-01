import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();
      const userList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: userList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({users}) => {

  return (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID: </strong> {user.uid}
          </span>
          <hr></hr>
          <span>
            <strong>Email: </strong> {user.email}
          </span>
          <hr></hr>
          <span>
            <strong>Username: </strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default withFirebase(Admin);

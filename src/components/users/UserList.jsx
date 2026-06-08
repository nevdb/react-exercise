import { Component } from "react";

import User from "./User";

class UsersList extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
      more: "Test",
    };
  }

  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users provided!");
    }
  }

  toggleUsersHandler() {
    // this.state.showUsers = false; // NOT!
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = this.props.users ?? [];

    return (
      <div className="my-8 mx-auto bg-white p-4 rounded-[12px] max-w-[40rem] text-center">
        <button
          onClick={this.toggleUsersHandler.bind(this)}
          className="font-inherit cursor-pointer bg-rose-900 text-rose border border-rose-900 rounded-xl py-3 px-8 hover:bg-rose-700"
        >
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>

        {this.state.showUsers &&
          (usersList.length > 0 ? (
            <ul>
              {usersList.map((user) => (
                <User key={user.id} name={user.name} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-slate-600">No users found.</p>
          ))}
      </div>
    );
  }
}

export default UsersList;

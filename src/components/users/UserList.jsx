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
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-300/20 bg-slate-900/65 p-5 text-center">
        <button
          onClick={this.toggleUsersHandler.bind(this)}
          className="cursor-pointer rounded-full bg-[#f5ff56] px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#e9f73a]"
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
            <p className="mt-4 text-slate-300">No users found.</p>
          ))}
      </div>
    );
  }
}

export default UsersList;

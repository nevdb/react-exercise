import { Fragment, Component } from "react";

import UsersList from "./UserList.jsx";
import UsersContext from "./user-context.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }
  componentDidMount() {
    // Send http request...
    this.setState({ filteredUsers: this.context.users });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) =>
          user.name.includes(this.state.searchTerm),
        ),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <section className="mx-auto mb-4 w-full max-w-3xl rounded-3xl border border-slate-300/20 bg-slate-900/70 p-6">
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="mt-2 text-sm text-slate-300">
            Search and manage your active members directory.
          </p>
          <div className="mt-4">
            <input
              type="search"
              onChange={this.searchChangeHandler.bind(this)}
              placeholder="Search users by name"
              className="w-full rounded-xl border border-slate-400/35 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-[#3531cf] focus:ring-2 focus:ring-[#3531cf]/30"
            />
          </div>

          <ErrorBoundary>
            <UsersList users={this.state.filteredUsers} />
          </ErrorBoundary>
        </section>
      </Fragment>
    );
  }
}

export default UserFinder;

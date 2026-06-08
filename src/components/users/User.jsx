import { Component } from "react";

// import classes from "./User.module.css";

class User extends Component {
  render() {
    return (
      <li className="w-auto my-4 px-3 py-2 rounded-xl font-inherit cursor-pointer bg-rose-900 text-white hover:bg-rose-700">
        {this.props.name}
      </li>
    );
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;

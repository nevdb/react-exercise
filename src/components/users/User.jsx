import { Component } from "react";

// import classes from "./User.module.css";

class User extends Component {
  render() {
    return (
      <li className="mx-auto my-3 w-full max-w-md rounded-xl border border-slate-300/20 bg-slate-950/65 px-3 py-2 text-slate-100 transition hover:border-[#3531cf]/40 hover:bg-slate-900">
        {this.props.name}
      </li>
    );
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;

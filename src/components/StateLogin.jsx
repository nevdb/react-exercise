import { useState } from "react";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsNotValid = didEdit.email && !enteredValues.email.includes("@");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted!", enteredValues);

    setEnteredValues({
      email: "",
      password: "",
    });
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-300/20 bg-slate-950/65 p-5 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-white">Member Login</h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur("email")}
            className="w-full rounded-xl border border-slate-400/35 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-[#3531cf] focus:ring-2 focus:ring-[#3531cf]/30"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
          />
          <div className="text-red-600">
            {emailIsNotValid && <p>Please enter a valid email address!</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full rounded-xl border border-slate-400/35 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-[#3531cf] focus:ring-2 focus:ring-[#3531cf]/30"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setEnteredValues({ email: "", password: "" })}
          className="rounded-full border border-slate-400/35 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-100/10"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#f5ff56] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[#e9f73a]"
        >
          Login
        </button>
      </div>
    </form>
  );
}

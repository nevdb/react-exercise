import BaseInput from "./BaseInput";
import { isEmail, isNotEmpty, hasMinLength } from "./util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    reset: resetEmail,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
    reset: resetPassword,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  function handleReset() {
    resetEmail();
    resetPassword();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-300/20 bg-slate-950/65 p-5 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-white">Member Login</h2>

      <div className="mt-4 space-y-4">
        <BaseInput
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email!"}
        />

        <BaseInput
          label="password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password!"}
        />
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
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

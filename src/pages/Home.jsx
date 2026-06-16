import Login from "../components/StateLogin.jsx";
import Signup from "../components/Signup.jsx";

export default function Home() {
  return (
    <main className="space-y-12 pb-16 pt-4 md:space-y-16 md:pt-8">
      <h1>Home</h1>
      <p>Welcome to the home page.</p>

      <Login />
      {/* <Signup /> */}
    </main>
  );
}

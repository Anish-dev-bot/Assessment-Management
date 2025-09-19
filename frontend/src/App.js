import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Report from "./components/Report";

export default function App() {
  const [page, setPage] = useState("signup"); // signup, login, report

  const handleLoginSuccess = () => setPage("report");
  const handleSignupSuccess = () => setPage("login");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {page === "signup" && <Signup onSignupSuccess={handleSignupSuccess} />}
      {page === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {page === "report" && <Report />}
      <div className="mt-4 text-center">
        {page !== "signup" && <button onClick={() => setPage("signup")} className="text-blue-500 underline mr-2">Signup</button>}
        {page !== "login" && <button onClick={() => setPage("login")} className="text-blue-500 underline">Login</button>}
      </div>
    </div>
  );
}

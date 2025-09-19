import { useState } from "react";
import GenerateReport from "./GenerateReport";

export default function Dashboard({ token, onLogout }) {
  const [sessionId, setSessionId] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white p-2 rounded mb-4"
      >
        Logout
      </button>
      <input
        type="text"
        placeholder="Enter session_id"
        className="w-full border p-2 rounded mb-4"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <GenerateReport sessionId={sessionId} token={token} />
    </div>
  );
}

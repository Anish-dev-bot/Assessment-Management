import { useState } from "react";
import { generateReport } from "../api/api";

export default function Report() {
  const [sessionId, setSessionId] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    const res = await generateReport(sessionId);
    if (res.success) {
      setMessage(`PDF generated at: ${res.path}`);
    } else {
      setMessage(res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Generate Report</h2>
      <input
        type="text"
        placeholder="Session ID"
        className="w-full border p-2 rounded mb-4"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button onClick={handleGenerate} className="w-full bg-purple-500 text-white p-2 rounded">
        Generate PDF
      </button>
      {message && <p className="mt-4 text-blue-500">{message}</p>}
    </div>
  );
}

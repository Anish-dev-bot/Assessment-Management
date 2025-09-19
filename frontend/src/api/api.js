const BASE_URL = "http://localhost:5000";

export async function registerUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, error: "Network error" };
  }
}

export async function loginUser(data) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, error: "Network error" };
  }
}

export async function generateReport(session_id) {
  const token = localStorage.getItem("token"); // JWT token
  if (!token) return { success: false, error: "No token found" };

  try {
    const res = await fetch(`${BASE_URL}/generate-report`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ session_id }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, error: "Network error" };
  }
}


const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const assessments = require("./data");

const app = express();
app.use(bodyParser.json());

const PORT = 5000;
const JWT_SECRET = "supersecretkey";

// --- In-memory user storage ---
const users = [];

// --- Authentication Middleware ---
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, error: "Invalid token" });
    req.user = user;
    next();
  });
}

// --- Register ---
app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, error: "Email and password required" });

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, error: "User already exists" });
  }

  users.push({ email, password });
  res.json({ success: true, message: "User registered successfully" });
});

// --- Login ---
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, error: "Invalid credentials" });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ success: true, token });
});

// --- Report Generation Endpoint ---
app.post("/generate-report", authenticate, async (req, res) => {
  const { session_id } = req.body;
  if (!session_id) return res.status(400).json({ success: false, error: "session_id is required" });

  const assessment = assessments.find(a => a.session_id === session_id);
  if (!assessment) return res.status(404).json({ success: false, error: "Assessment not found" });

  try {
    const html = generateHTML(assessment);
    const filePath = path.join(__dirname, `reports/${session_id}.pdf`);

    // Ensure folder exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({ path: filePath, format: "A4" });
    await browser.close();

    res.json({ success: true, message: "PDF generated", path: filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "PDF generation failed" });
  }
});

// --- HTML Template Generator ---
function generateHTML(assessment) {
  const { session_id, assessment_id, accuracy, bodyCompositionData, vitalsMap, exercises } = assessment;

  const exerciseTime = exercises.find(e => e.id === 235)?.setList[0]?.time || 0;

  return `
  <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #333; }
        .section { margin-bottom: 20px; }
        .field { margin: 5px 0; }
      </style>
    </head>
    <body>
      <h1>Assessment Report: ${assessment_id}</h1>
      <div class="section">
        <h2>Overall Accuracy</h2>
        <div class="field">Score: ${accuracy}%</div>
      </div>
      <div class="section">
        <h2>Body Composition</h2>
        <div class="field">BMI: ${bodyCompositionData.BMI}</div>
        <div class="field">BFC: ${bodyCompositionData.BFC}</div>
        <div class="field">Height: ${bodyCompositionData.HeightM} cm</div>
      </div>
      <div class="section">
        <h2>Vitals</h2>
        <div class="field">Heart Rate: ${vitalsMap.vitals.heart_rate}</div>
        <div class="field">BP Sys: ${vitalsMap.vitals.bp_sys}</div>
        <div class="field">BP Dia: ${vitalsMap.vitals.bp_dia}</div>
      </div>
      <div class="section">
        <h2>Cardio Exercise</h2>
        <div class="field">Jog Test Time: ${exerciseTime} sec</div>
      </div>
    </body>
  </html>
  `;
}

// --- Start server ---
app.listen(PORT, () => console.log(`✅ Assessment Management System Backend is running on port ${PORT}`));

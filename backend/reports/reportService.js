const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const jp = require("jsonpath");
const config = require("../config");
const data = require("../data");

async function generateReport(session_id) {
  const record = data.find(d => d.session_id === session_id);
  if (!record) throw new Error("Session not found");

  const assessmentConfig = config[record.assessment_id];
  if (!assessmentConfig) throw new Error("Unsupported assessment type");

  const extracted = {};
  for (let [key, jpath] of Object.entries(assessmentConfig.fields)) {
    try {
      extracted[key] = jp.value(record, jpath);
    } catch {
      extracted[key] = "N/A";
    }
  }

  const html = `
    <html>
    <head><title>${assessmentConfig.name} Report</title></head>
    <body>
      <h1>${assessmentConfig.name}</h1>
      <h2>Session: ${session_id}</h2>
      <ul>
        <li><b>Overall Score:</b> ${extracted.overallScore}</li>
        <li><b>Heart Rate:</b> ${extracted.heartRate}</li>
        <li><b>Blood Pressure:</b> ${extracted.bloodPressureSys}/${extracted.bloodPressureDia}</li>
        <li><b>BMI:</b> ${extracted.bmi}</li>
        <li><b>Endurance (time):</b> ${extracted.endurance}</li>
      </ul>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const outDir = path.join(__dirname, "../generated_reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const outPath = path.join(outDir, `${session_id}.pdf`);
  await page.pdf({ path: outPath, format: "A4" });

  await browser.close();
  return outPath;
}

module.exports = { generateReport };

// data.js
const assessments = [
  {
    "session_id": "session_001",
    "accuracy": 80,
    "assessment_id": "as_hr_02",
    "bodyCompositionData": { "BMI": "33.145", "BFC": "29.754", "HeightM": "184.091" },
    "vitalsMap": { "vitals": { "heart_rate": 75, "bp_sys": 124, "bp_dia": 82 } },
    "exercises": [
      { "id": 235, "name": "Jog test", "setList": [{ "time": 61 }] }
    ]
  },
  {
    "session_id": "session_002",
    "accuracy": 17,
    "assessment_id": "as_card_01",
    "bodyCompositionData": { "BMI": "9.51", "BFC": "-0.90", "HeightM": "145" },
    "vitalsMap": { "vitals": { "heart_rate": 66, "bp_sys": 110, "bp_dia": 75 } },
    "exercises": [
      { "id": 235, "name": "Jog test", "setList": [{ "time": 47 }] }
    ]
  }
];

module.exports = assessments;

// Config-driven assessment definitions
module.exports = {
  as_hr_02: {
    name: "Health & Fitness Assessment",
    sections: ["Key Body Vitals", "Heart Health", "Stress Level", "Fitness Levels", "Posture", "Body Composition"],
    fields: {
      overallScore: "$.accuracy",
      heartRate: "$.vitalsMap.vitals.heart_rate",
      bloodPressureSys: "$.vitalsMap.vitals.bp_sys",
      bloodPressureDia: "$.vitalsMap.vitals.bp_dia",
      bmi: "$.bodyCompositionData.BMI",
      endurance: "$.exercises[?(@.id==235)].setList[0].time"
    }
  },
  as_card_01: {
    name: "Cardiac Assessment",
    sections: ["Key Body Vitals", "Cardiovascular Endurance", "Body Composition"],
    fields: {
      overallScore: "$.accuracy",
      heartRate: "$.vitalsMap.vitals.heart_rate",
      bloodPressureSys: "$.vitalsMap.vitals.bp_sys",
      bloodPressureDia: "$.vitalsMap.vitals.bp_dia",
      bmi: "$.bodyCompositionData.BMI",
      endurance: "$.exercises[?(@.id==235)].setList[0].time"
    }
  }
};

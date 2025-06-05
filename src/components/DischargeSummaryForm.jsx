import { useState } from "react";

import { generatePDF } from "../generatePDF";

import { PatientDetails } from './FormSection/PatientDetails';
import { ClinicalFindings } from "./FormSection/ClinicalFindings";
import { SystemicExamination } from "./FormSection/SystemicExamination";
import { BloodInvestigation } from "./FormSection/BloodInvestigation";
import { Radiological } from "./FormSection/Radiological";
import { HospitalCourse } from "./FormSection/HospitalCourse";
import { Challenges } from "./FormSection/Challenges";
import { ConditionAtDischarge } from "./FormSection/ConditionAtDischarge";
import { DischargeMedication } from "./FormSection/DischargeMedication";
import { SpecialInstructions } from "./FormSection/SpecialInstructions";
import { ReviewDate } from "./FormSection/ReviewDate";
import "./dischargesummaryform.css";

const DischargeSummaryForm = () => {

  const [pdfDataUrl, setPdfDataUrl] = useState(null);

  const [formData, setFormData] = useState({
    // Patient Details
    patientName: "",
    age: "",
    sex: "",
    pastMedicalHistory: [""],
    uhidRegNo: "",
    department: "",
    husbandName: "",
    address: "",
    consultantInCharge: "",
    bedNo: "",
    dateAdmission: "",
    timeAdmission: "",
    dateDischarge: "",
    timeDischarge: "",
    procedure: "",
    dischargeDiagnosis: [""],
    presentingComplaints: [""],

    // Clinical Findings
    generalCondition: "",
    pallor: "",
    icterus: "",
    bloodPressure: "",
    pulseRate: "",
    respiratoryRate: "",
    temperature: "",
    spO2: "",
    spO2Method: "",

    // Systemic Examination
    cns: "",
    cvs: "",
    respiratorySystem: "",
    perAbdomen: "",
    bowelSounds: "",

    // Key Blood Investigations
    bloodInvestigations: [
      { date: "", tests: [{ name: "", value: "", unit: "" }] },
    ],

    // Radiological & Diagnostic Findings
    radiologicalFindings: [
      {
        name: "",              // e.g., "Chest X-Ray"
        date: "",              // e.g., "2025-06-01"
        descriptions: [""]     // e.g., ["Normal lung fields", "No pleural effusion"]
      }
    ],


    // Hospital Course & Treatment
    hospitalCourse: [
      {
        treatment: "",
        subpoints: [""],
      }
    ],

    // Challenges During Treatment
    treatmentChallenges: [
      {
        challenges: "",
        subpoints: [""]
      }
    ],

    // Condition at Discharge
    conditionAtDischarge: [""],

    // Discharge Medication
    dischargeMedication: [{ name: "", dosageDuration: ""}],

    // Special Instructions
    specialInstructions: [""],

    // Review Date
    reviewDate: {
      followUp:"",
    },
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    setFormData({
      ...formData,
      [arrayName]: updatedArray,
    });
  };


  const addArrayItem = (arrayName, defaultValue) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], defaultValue],
    });
  };

  const removeArrayItem = (arrayName, index) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray.splice(index, 1);
    setFormData({
      ...formData,
      [arrayName]: updatedArray,
    });
  };

  return (
    <div
      className="discharge-summary-form"
      style={{ maxWidth: "80%", margin: "0 auto", padding: "20px" }}
    >
      <h1
        className="text-5xl "
        style={{ textAlign: "center", marginBottom: "25px" }}
      >
        Discharge Summary Form
      </h1>

      <form>
        {/* Patient Details Section */}
        <PatientDetails handleChange={handleChange} formData={formData} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />


        {/* Clinical Findings Section */}
        <ClinicalFindings handleChange={handleChange} formData={formData} />

        {/* Systemic Examination Section */}
        <SystemicExamination handleChange={handleChange} formData={formData} />

        {/* Key Blood Investigations Section */}
        <BloodInvestigation formData={formData} removeArrayItem={removeArrayItem} setFormData={setFormData} />

        {/* Radiological & Diagnostic Findings Section */}
        <Radiological formData={formData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} setFormData={setFormData} />

        {/* hospitalCourse */}
        <HospitalCourse formData={formData} setFormData={setFormData} />

        {/* Challenges During Treatment Section */}
        <Challenges formData={formData} setFormData={setFormData} />


        {/* Condition at Discharge Section */}
        <ConditionAtDischarge formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem}/>

        {/* Discharge Medication Section */}
        <DischargeMedication formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} setFormData={setFormData}/>

        {/* Special Instructions Section */}
        <SpecialInstructions formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem}/>

        {/* Review Date Section */}
        <ReviewDate formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} setFormData={setFormData}/>

        {/* Generate PDF and Preview Buttons */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "50px",
          }}
        >
          <button
            type="button"
            onClick={() => generatePDF(formData)}
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              padding: "12px 30px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              marginRight: "10px",
            }}
          >
            Generate Discharge Summary PDF
          </button>

          <button
            type="button"
            onClick={() => {
              const pdfUrl = generatePDF(formData, true);
              setPdfDataUrl(pdfUrl);
            }}
            style={{
              background: "#2196F3",
              color: "white",
              border: "none",
              padding: "12px 30px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            Preview PDF
          </button>

          {pdfDataUrl && (
            <div style={{ marginTop: "20px" }}>
              <h3>PDF Preview</h3>
              <iframe
                src={pdfDataUrl}
                style={{
                  width: "100%", // Custom width (adjust as needed, e.g., "100%", "600px")
                  height: "600px", // Custom height (adjust as needed, e.g., "400px", "80vh")
                }}
                title="PDF Preview"
                className="border"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default DischargeSummaryForm;

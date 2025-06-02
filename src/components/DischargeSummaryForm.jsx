import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { generatePDF } from "../generatePDF";

import { PatientDetails } from './FormSection/PatientDetails';
import { ClinicalFindings } from "./FormSection/ClinicalFindings";
import { SystemicExamination } from "./FormSection/SystemicExamination";
import { BloodInvestigation } from "./FormSection/BloodInvestigation";
import { Radiological } from "./FormSection/Radiological";
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


    // Diagnosis
    diagnosis: [""],

    // Hospital Course & Treatment
    hospitalCourse: "",

    // Challenges During Treatment
    treatmentChallenges: [""],

    // Condition at Discharge
    conditionAtDischarge: "",

    // Discharge Medication
    dischargeMedication: [{ name: "", dosage: "", duration: "" }],

    // Special Instructions
    specialInstructions: "",

    // Review Date
    reviewDate: "",

    // Emergency Contact
    emergencyContact: "",
    emergencySymptoms: [""],
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

  const handleNestedArrayChange = (
    parentIndex,
    childIndex,
    field,
    value,
    parentArrayName
  ) => {
    const updatedArray = [...formData[parentArrayName]];
    updatedArray[parentIndex].tests[childIndex][field] = value;
    setFormData({
      ...formData,
      [parentArrayName]: updatedArray,
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

  const addBloodInvestigation = () => {
    setFormData({
      ...formData,
      bloodInvestigations: [
        ...formData.bloodInvestigations,
        { date: "", tests: [{ name: "", value: "", unit: "" }] },
      ],
    });
  };

  const addTestToInvestigation = (investigationIndex) => {
    const updatedInvestigations = [...formData.bloodInvestigations];
    updatedInvestigations[investigationIndex].tests.push({
      name: "",
      value: "",
      unit: "",
    });
    setFormData({
      ...formData,
      bloodInvestigations: updatedInvestigations,
    });
  };

  const removeTestFromInvestigation = (investigationIndex, testIndex) => {
    const updatedInvestigations = [...formData.bloodInvestigations];
    updatedInvestigations[investigationIndex].tests.splice(testIndex, 1);
    setFormData({
      ...formData,
      bloodInvestigations: updatedInvestigations,
    });
  };

  const handleBloodInvestigationChange = (investigationIndex, field, value) => {
    const updatedInvestigations = [...formData.bloodInvestigations];
    updatedInvestigations[investigationIndex][field] = value;
    setFormData({
      ...formData,
      bloodInvestigations: updatedInvestigations,
    });
  };


  const handleTestChange = (investigationIndex, testIndex, field, value) => {
    const updatedInvestigations = [...formData.bloodInvestigations];
    updatedInvestigations[investigationIndex].tests[testIndex][field] = value;
    setFormData({
      ...formData,
      bloodInvestigations: updatedInvestigations,
    });
  };



  const addRadiologicalFinding = (formData, setFormData) => {
    setFormData({
      ...formData,
      radiologicalFindings: [
        ...formData.radiologicalFindings,
        { name: "", date: "", descriptions: [""] },
      ],
    });
  };

  const removeRadiologicalFinding = (formData, setFormData, index) => {
    const updatedFindings = [...formData.radiologicalFindings];
    updatedFindings.splice(index, 1);
    setFormData({
      ...formData,
      radiologicalFindings: updatedFindings,
    });
  };

  const handleRadiologicalFindingChange = (
    formData,
    setFormData,
    index,
    field,
    value
  ) => {
    const updatedFindings = [...formData.radiologicalFindings];
    updatedFindings[index][field] = value;
    setFormData({
      ...formData,
      radiologicalFindings: updatedFindings,
    });
  };

  const handleDescriptionChange = (
    formData,
    setFormData,
    index,
    descIndex,
    value
  ) => {
    const updatedFindings = [...formData.radiologicalFindings];
    updatedFindings[index].descriptions[descIndex] = value;
    setFormData({
      ...formData,
      radiologicalFindings: updatedFindings,
    });
  };

  const addDescription = (formData, setFormData, index) => {
    const updatedFindings = [...formData.radiologicalFindings];
    updatedFindings[index].descriptions.push("");
    setFormData({
      ...formData,
      radiologicalFindings: updatedFindings,
    });
  };

  const removeDescription = (formData, setFormData, index, descIndex) => {
    const updatedFindings = [...formData.radiologicalFindings];
    updatedFindings[index].descriptions.splice(descIndex, 1);
    setFormData({
      ...formData,
      radiologicalFindings: updatedFindings,
    });
  };


  const handlePreview = () => {
    const pdfUrl = generatePDF(formData, true); // Get Data URL for preview
    setPdfDataUrl(pdfUrl);
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
        <BloodInvestigation formData={formData} removeArrayItem={removeArrayItem} addArrayItem={addArrayItem} addBloodInvestigation={addBloodInvestigation} addTestToInvestigation={addTestToInvestigation} removeTestFromInvestigation={removeTestFromInvestigation} handleBloodInvestigationChange={handleBloodInvestigationChange} handleTestChange={handleTestChange} />

        {/* Radiological & Diagnostic Findings Section */}
        <Radiological formData={formData} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} addRadiologicalFinding={addRadiologicalFinding} handleRadiologicalFindingChange={handleRadiologicalFindingChange} removeRadiologicalFinding={removeRadiologicalFinding} handleDescriptionChange={handleDescriptionChange} addDescription={addDescription} removeDescription={removeDescription} setFormData={setFormData} />

        

        {/* Hospital Course & Treatment Section */}
        <div
          className="form-section"
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Hospital Course & Treatment Administered
          </h2>

          <div className="form-group">
            <textarea
              id="hospitalCourse"
              name="hospitalCourse"
              value={formData.hospitalCourse}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                minHeight: "120px",
              }}
            />
          </div>
        </div>

        {/* Challenges During Treatment Section */}
        <div
          className="form-section"
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Challenges During Treatment & Reasons for Prolonged Hospitalization
          </h2>

          {formData.treatmentChallenges.map((challenge, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "treatmentChallenges",
                      e.target.value,
                      "treatmentChallenges"
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  placeholder={`Challenge ${index + 1}`}
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("treatmentChallenges", index)}
                  style={{
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayItem("treatmentChallenges", "")}
            style={{
              background: "#2196F3",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Add Challenge
          </button>
        </div>

        {/* Condition at Discharge Section */}
        <div
          className="form-section"
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Condition at Discharge
          </h2>

          <div className="form-group">
            <input
              type="text"
              id="conditionAtDischarge"
              name="conditionAtDischarge"
              value={formData.conditionAtDischarge}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        </div>

        {/* Discharge Medication Section */}
        <div
          className="form-section"
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Discharge Medication
          </h2>

          {formData.dischargeMedication.map((medication, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr auto",
                gap: "10px",
              }}
            >
              <div className="form-group">
                <label htmlFor={`medication-name-${index}`}>Medication:</label>
                <input
                  type="text"
                  id={`medication-name-${index}`}
                  value={medication.name}
                  onChange={(e) => {
                    const updatedMedications = [
                      ...formData.dischargeMedication,
                    ];
                    updatedMedications[index].name = e.target.value;
                    setFormData({
                      ...formData,
                      dischargeMedication: updatedMedications,
                    });
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`medication-dosage-${index}`}>Dosage:</label>
                <input
                  type="text"
                  id={`medication-dosage-${index}`}
                  value={medication.dosage}
                  onChange={(e) => {
                    const updatedMedications = [
                      ...formData.dischargeMedication,
                    ];
                    updatedMedications[index].dosage = e.target.value;
                    setFormData({
                      ...formData,
                      dischargeMedication: updatedMedications,
                    });
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`medication-duration-${index}`}>
                  Duration:
                </label>
                <input
                  type="text"
                  id={`medication-duration-${index}`}
                  value={medication.duration}
                  onChange={(e) => {
                    const updatedMedications = [
                      ...formData.dischargeMedication,
                    ];
                    updatedMedications[index].duration = e.target.value;
                    setFormData({
                      ...formData,
                      dischargeMedication: updatedMedications,
                    });
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("dischargeMedication", index)}
                  style={{
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    alignSelf: "end",
                    marginBottom: "5px",
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addArrayItem("dischargeMedication", {
                name: "",
                dosage: "",
                duration: "",
              })
            }
            style={{
              background: "#2196F3",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Add Medication
          </button>
        </div>

        {/* Special Instructions Section */}
        <div
          className="form-section"
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Special Instruction/s
          </h2>

          <div className="form-group">
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                minHeight: "80px",
              }}
            />
          </div>
        </div>

        {/* Review Date Section */}
        <div
          className="form-section"
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Review Date
          </h2>

          <div className="form-group">
            <label htmlFor="reviewDate">Follow-up:</label>
            <input
              type="text"
              id="reviewDate"
              name="reviewDate"
              value={formData.reviewDate}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div
          className="form-section"
          style={{
            marginBottom: "30px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px",
              marginBottom: "20px",
            }}
          >
            Emergency Contact Information
          </h2>

          <div className="form-group">
            <label htmlFor="emergencyContact">Contact Number:</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
              placeholder="e.g., 0522-2619049/50 or 2231932"
            />
          </div>

          <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
            Symptoms to watch for:
          </h3>

          {formData.emergencySymptoms.map((symptom, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  value={symptom}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "emergencySymptoms",
                      e.target.value,
                      "emergencySymptoms"
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  placeholder={`Symptom ${index + 1}`}
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("emergencySymptoms", index)}
                  style={{
                    background: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayItem("emergencySymptoms", "")}
            style={{
              background: "#2196F3",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Add Symptom
          </button>
        </div>

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

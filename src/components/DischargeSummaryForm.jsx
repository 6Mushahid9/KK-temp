import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { generatePDF } from "../generatePDF";

import { PatientDetails } from './FormSection/PatientDetails';
import { ClinicalFindings } from "./FormSection/ClinicalFindings";
import { SystemicExamination } from "./FormSection/SystemicExamination";
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
    radiologicalFindings: [{ date: "", description: "" }],

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
            Key Blood Investigations (Pathology)
          </h2>

          {formData.bloodInvestigations.map(
            (investigation, investigationIndex) => (
              <div
                key={investigationIndex}
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  border: "1px solid #eee",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div className="form-group" style={{ width: "60%" }}>
                    <label htmlFor={`investigation-date-${investigationIndex}`}>
                      Date:
                    </label>
                    <input
                      type="text"
                      id={`investigation-date-${investigationIndex}`}
                      value={investigation.date}
                      onChange={(e) =>
                        handleBloodInvestigationChange(
                          investigationIndex,
                          "date",
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        marginTop: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>

                  {investigationIndex > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "bloodInvestigations",
                          investigationIndex
                        )
                      }
                      style={{
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Remove Date
                    </button>
                  )}
                </div>

                {investigation.tests.map((test, testIndex) => (
                  <div
                    key={testIndex}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr auto",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div className="form-group">
                      <label
                        htmlFor={`test-name-${investigationIndex}-${testIndex}`}
                      >
                        Test Name:
                      </label>
                      <input
                        type="text"
                        id={`test-name-${investigationIndex}-${testIndex}`}
                        value={test.name}
                        onChange={(e) =>
                          handleTestChange(
                            investigationIndex,
                            testIndex,
                            "name",
                            e.target.value
                          )
                        }
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
                      <label
                        htmlFor={`test-value-${investigationIndex}-${testIndex}`}
                      >
                        Value:
                      </label>
                      <input
                        type="text"
                        id={`test-value-${investigationIndex}-${testIndex}`}
                        value={test.value}
                        onChange={(e) =>
                          handleTestChange(
                            investigationIndex,
                            testIndex,
                            "value",
                            e.target.value
                          )
                        }
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
                      <label
                        htmlFor={`test-unit-${investigationIndex}-${testIndex}`}
                      >
                        Unit:
                      </label>
                      <input
                        type="text"
                        id={`test-unit-${investigationIndex}-${testIndex}`}
                        value={test.unit}
                        onChange={(e) =>
                          handleTestChange(
                            investigationIndex,
                            testIndex,
                            "unit",
                            e.target.value
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "8px",
                          marginTop: "5px",
                          borderRadius: "4px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    {testIndex > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeTestFromInvestigation(
                            investigationIndex,
                            testIndex
                          )
                        }
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
                  onClick={() => addTestToInvestigation(investigationIndex)}
                  style={{
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Add Test
                </button>
              </div>
            )
          )}

          <button
            type="button"
            onClick={addBloodInvestigation}
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
            Add Investigation Date
          </button>
        </div>

        {/* Radiological & Diagnostic Findings Section */}
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
            Radiological & Diagnostic Findings
          </h2>

          {formData.radiologicalFindings.map((finding, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div className="form-group" style={{ width: "60%" }}>
                  <label htmlFor={`finding-date-${index}`}>Date:</label>
                  <input
                    type="text"
                    id={`finding-date-${index}`}
                    value={finding.date}
                    onChange={(e) => {
                      const updatedFindings = [
                        ...formData.radiologicalFindings,
                      ];
                      updatedFindings[index].date = e.target.value;
                      setFormData({
                        ...formData,
                        radiologicalFindings: updatedFindings,
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
                    onClick={() =>
                      removeArrayItem("radiologicalFindings", index)
                    }
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

              <div className="form-group">
                <label htmlFor={`finding-description-${index}`}>
                  Description:
                </label>
                <textarea
                  id={`finding-description-${index}`}
                  value={finding.description}
                  onChange={(e) => {
                    const updatedFindings = [...formData.radiologicalFindings];
                    updatedFindings[index].description = e.target.value;
                    setFormData({
                      ...formData,
                      radiologicalFindings: updatedFindings,
                    });
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    minHeight: "80px",
                  }}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addArrayItem("radiologicalFindings", {
                date: "",
                description: "",
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
            Add Finding
          </button>
        </div>

        {/* Diagnosis Section */}
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
            Diagnosis
          </h2>

          {formData.diagnosis.map((item, index) => (
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
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(
                      index,
                      "diagnosis",
                      e.target.value,
                      "diagnosis"
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                  placeholder={`Diagnosis ${index + 1}`}
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("diagnosis", index)}
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
            onClick={() => addArrayItem("diagnosis", "")}
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
            Add Diagnosis
          </button>
        </div>

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
                  border: "1px solid #ddd",
                  maxWidth: "800px", // Optional: constrain max width
                }}
                title="PDF Preview"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default DischargeSummaryForm;

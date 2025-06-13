import { useState } from "react";

import { generatePDF } from "../generatePDF";

import { PatientDetails } from "./FormSection/PatientDetails";
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

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DischargeSummaryForm = () => {
  const [value, setValue] = useState(0);
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };

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
    temperature: "°F",
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
        name: "", // e.g., "Chest X-Ray"
        date: "", // e.g., "2025-06-01"
        descriptions: [""], // e.g., ["Normal lung fields", "No pleural effusion"]
      },
    ],

    // Hospital Course & Treatment
    hospitalCourse: [
      {
        treatment: "",
        subpoints: [""],
      },
    ],

    // Challenges During Treatment
    treatmentChallenges: [
      {
        challenges: "",
        subpoints: [""],
      },
    ],

    // Condition at Discharge
    conditionAtDischarge: [""],

    // Discharge Medication
    dischargeMedication: [{ name: "", dosageDuration: "" }],

    // Special Instructions
    specialInstructions: [""],

    // Review Date
    reviewDate: {
      followUp: "",
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

  const [investigations, setInvestigations] = useState([]);

  return (
    <>
      <div className="flex gap-6 items-center justify-center ">
        <span>
          <img src="/logo.png" alt="logo" height={50} width={50} />
        </span>
        <h1
          className="text-5xl text-black font-bold my-5"
          style={{ textAlign: "center", marginBottom: "25px" }}
        >
          Discharge Summary Form
        </h1>
      </div>
      <div className="w-full bg-black h-0.5 mb-5"></div>

      <form>
        <Box className="flex">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange2}
              aria-label="basic tabs example"
              orientation="vertical"
              sx={{
                alignItems: "flex-start",
                '& .MuiTabs-indicator': {
                  backgroundColor: '#5fc1b2',
                },
                '& .MuiTab-root': {
                  color: '#000', // Default tab text color
                },
                '& .Mui-selected': {
                  color: '#5fc1b2', // Selected tab color
                },
              }}
              textColor="inherit"
              indicatorColor="secondary" // this is overridden by sx
            >
              {[
                "Patient Details",
                "Clinical Findings",
                "Systemic Examination",
                "Radiological & Diagnostic Findings",
                "Course & Treatment Administered",
                "Challenges During Treatment",
                "Condition at Discharge",
                "Discharge Medication",
                "Special Instruction(s)",
                "Review Date",
                "Output",
                "Blood Investigation",
              ].map((label, index) => (
                <Tab
                  key={index}
                  label={label}
                  {...a11yProps(index)}
                  sx={{
                    alignItems: "flex-start", // Align text container
                    justifyContent: "flex-start", // Align content inside tab
                    textAlign: "left", // Align multi-line text
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <CustomTabPanel value={value} index={0}>
            <PatientDetails
              handleChange={handleChange}
              formData={formData}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ClinicalFindings handleChange={handleChange} formData={formData} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <SystemicExamination
              handleChange={handleChange}
              formData={formData}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Radiological
              formData={formData}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              setFormData={setFormData}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <HospitalCourse formData={formData} setFormData={setFormData} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <Challenges formData={formData} setFormData={setFormData} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            <ConditionAtDischarge
              formData={formData}
              handleChange={handleChange}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={7}>
            <DischargeMedication
              formData={formData}
              handleChange={handleChange}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              setFormData={setFormData}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={8}>
            <SpecialInstructions
              formData={formData}
              handleChange={handleChange}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={9}>
            <ReviewDate
              formData={formData}
              handleChange={handleChange}
              handleArrayChange={handleArrayChange}
              addArrayItem={addArrayItem}
              removeArrayItem={removeArrayItem}
              setFormData={setFormData}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={10}>
            {/* Generate PDF and Preview Buttons */}
            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "50px",
                width: "80vw",
              }}
            >
              <button
                type="button"
                onClick={() => generatePDF(formData, investigations)}
                style={{
                  padding: "12px 30px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  marginRight: "10px",
                }}
                className="bg-[#4c9e92] hover:bg-[#5fc1b2] transition-colors duration-300 text-white"
              >
                Generate Discharge Summary PDF
              </button>

              <button
                type="button"
                onClick={() => {
                  const pdfUrl = generatePDF(formData, true, investigations);
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
          </CustomTabPanel>

          <CustomTabPanel value={value} index={11}>
            <BloodInvestigation
              investigations={investigations}
              setInvestigations={setInvestigations}
              removeArrayItem={removeArrayItem}
              setFormData={setFormData}
            />
          </CustomTabPanel>

        </Box>
      </form>
      <div
        className="discharge-summary-form"
        style={{ margin: "0 auto", padding: "20px" }}
      ></div>
    </>
  );
};

export default DischargeSummaryForm;

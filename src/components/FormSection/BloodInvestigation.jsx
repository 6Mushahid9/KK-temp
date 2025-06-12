import { useState } from "react";

const testCategories = {
  Haematology: [
    {
      name: "Haemoglobin (Hb)",
      unit: "gm%",
      referenceRange: "12.0 – 15.5 gm%",
    },
    {
      name: "Total Leukocyte Count (TLC)",
      unit: "/mm³",
      referenceRange: "4,000 – 11,000 /mm³",
    },
    {
      name: "Platelet Count",
      unit: "/mm³",
      referenceRange: "1.5 – 4.5 lakh /mm³",
    },
    {
      name: "Total RBC Count",
      unit: "× 10⁶/µL",
      referenceRange: "3.8 – 5.0 × 10⁶/µL",
    },
    { name: "Hematocrit (HCT)", unit: "%", referenceRange: "36 – 46 %" },
  ],
  "Renal Function Tests (RFT)": [
    { name: "Blood Urea", unit: "mg/dL", referenceRange: "10 – 40 mg/dL" },
    {
      name: "Serum Creatinine",
      unit: "mg/dL",
      referenceRange: "0.6 – 1.2 mg/dL",
    },
  ],
  "Electrolytes & Minerals": [
    {
      name: "Serum Sodium (Na⁺)",
      unit: "mmol/L",
      referenceRange: "135 – 145 mmol/L",
    },
    {
      name: "Serum Potassium (K⁺)",
      unit: "mmol/L",
      referenceRange: "3.5 – 5.1 mmol/L",
    },
    {
      name: "Serum Calcium (Ca⁺)",
      unit: "mg/dL",
      referenceRange: "8.5 – 10.5 mg/dL",
    },
  ],
  "Coagulation Profile": [
    {
      name: "Prothrombin Time (PT)",
      unit: "sec",
      referenceRange: "11 – 13.5 sec",
    },
    { name: "INR", unit: "", referenceRange: "0.8 – 1.2" },
  ],
  "Liver Function Tests (LFT)": [
    { name: "Serum Protein", unit: "g/dL", referenceRange: "6.0 – 8.3 g/dL" },
    { name: "Serum Albumin", unit: "g/dL", referenceRange: "3.5 – 5.0 g/dL" },
    {
      name: "Serum Bilirubin (Total)",
      unit: "mg/dL",
      referenceRange: "0.2 – 1.2 mg/dL",
    },
    { name: "SGPT (ALT)", unit: "U/L", referenceRange: "5 – 40 U/L" },
    { name: "SGOT (AST)", unit: "U/L", referenceRange: "5 – 40 U/L" },
    {
      name: "Serum Alkaline Phosphatase",
      unit: "U/L",
      referenceRange: "40 – 129 U/L",
    },
  ],
  "Infectious Disease Markers": [
    { name: "Widal Test", unit: "", referenceRange: "" },
    { name: "Typhoid IgM (Card Test)", unit: "", referenceRange: "" },
    { name: "Typhoid IgG (Card Test)", unit: "", referenceRange: "" },
  ],
  "Other Investigations": [
    { name: "Procalcitonin (PCT)", unit: "ng/mL", referenceRange: "" },
    { name: "Urine Examination", unit: "", referenceRange: "" },
  ],
};

const allUnits = [
  "gm%",
  "/mm³",
  "× 10⁶/µL",
  "%",
  "mg/dL",
  "mmol/L",
  "sec",
  "",
  "g/dL",
  "U/L",
  "ng/mL",
];

export function BloodInvestigation() {
  const [investigations, setInvestigations] = useState([]);

  const addCategory = (category) => {
    setInvestigations([...investigations, { category, tests: [] }]);
  };

  const addTest = (categoryIndex, test) => {
    const newInvestigations = [...investigations];
    newInvestigations[categoryIndex].tests.push(test);
    setInvestigations(newInvestigations);
  };

  const updateTestValue = (categoryIndex, testIndex, field, value) => {
    const newInvestigations = [...investigations];
    newInvestigations[categoryIndex].tests[testIndex][field] = value;
    setInvestigations(newInvestigations);
  };

  // Function to delete a category
  const deleteCategory = (categoryIndex) => {
    const newInvestigations = investigations.filter((_, index) => index !== categoryIndex);
    setInvestigations(newInvestigations);
  };

  // Function to delete a test
  const deleteTest = (categoryIndex, testIndex) => {
    const newInvestigations = [...investigations];
    newInvestigations[categoryIndex].tests = newInvestigations[categoryIndex].tests.filter(
      (_, index) => index !== testIndex
    );
    // If no tests remain in the category, remove the category
    if (newInvestigations[categoryIndex].tests.length === 0) {
      newInvestigations.splice(categoryIndex, 1);
    }
    setInvestigations(newInvestigations);
  };

  return (
    <div className="space-y-4 form-section">
      <h2
        className="h2"
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Patient Laboratory Report
      </h2>

      {/* Add Category Dropdown */}
      <div>
        <label className="font-medium">Add Category:</label>
        <select
          onChange={(e) => {
            const selected = e.target.value;
            if (
              selected &&
              !investigations.find((inv) => inv.category === selected)
            ) {
              addCategory(selected);
            }
            e.target.value = "";
          }}
          className="ml-2 p-2 border border-gray-300 rounded"
        >
          <option value="">Select</option>
          {Object.keys(testCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Display Category Cards */}
      {investigations.map((inv, i) => (
        <div key={i} className="border rounded-md p-4 shadow-md relative">
          <h3 className="text-lg font-semibold mb-2">{inv.category}</h3>
          {/* Remove Category Button */}
          <button
            onClick={() => deleteCategory(i)}
            className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-700"
            title="Remove Category"
          >
            Remove Category
          </button>

          {inv.tests.map((test, j) => (
            <div key={j} className="grid grid-cols-12 gap-3 mb-2 relative">
              <div className="col-span-4">
                <label className="block text-sm font-medium">Test</label>
                <input
                  type="text"
                  value={test.name}
                  readOnly
                  className="w-full px-3 py-2 border rounded bg-gray-100"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium">Value</label>
                <input
                  type="text"
                  value={test.value || ""}
                  onChange={(e) =>
                    updateTestValue(i, j, "value", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Unit</label>
                <select
                  value={test.unit}
                  onChange={(e) =>
                    updateTestValue(i, j, "unit", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  {allUnits.map((unit, k) => (
                    <option key={k} value={unit}>
                      {unit || "(none)"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium">
                  Reference Range
                </label>
                <input
                  type="text"
                  value={test.referenceRange}
                  readOnly
                  className="w-full px-3 py-2 border rounded bg-gray-100"
                />
              </div>
              {/* Remove Test Button */}
              <button
                onClick={() => deleteTest(i, j)}
                className="mt-2 right-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-700"
                title="Remove Test"
              >
                Remove Test
              </button>
            </div>
          ))}

          {/* Sub Test Dropdown */}
          <div className="mt-2">
            <label className="text-sm font-medium">Add Test:</label>
            <select
              onChange={(e) => {
                const selectedTest = testCategories[inv.category].find(
                  (t) => t.name === e.target.value
                );
                if (
                  selectedTest &&
                  !inv.tests.find((t) => t.name === selectedTest.name)
                ) {
                  addTest(i, { ...selectedTest, value: "" });
                }
                e.target.value = "";
              }}
              className="ml-2 p-2 border rounded"
            >
              <option value="">Select Test</option>
              {testCategories[inv.category].map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
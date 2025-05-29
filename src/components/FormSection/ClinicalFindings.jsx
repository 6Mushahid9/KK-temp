export function ClinicalFindings({ handleChange, formData }) {
  return (
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
        className="h2"
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Clinical Findings (On Admission)
      </h2>

      <div className="grid grid-cols-12 gap-3.5">
        {/* row 1 */}
        <div className="form-group col-span-6 mt-3">
          <label htmlFor="generalCondition">General Condition (GC):</label>
          <input
            type="text"
            id="generalCondition"
            name="generalCondition"
            value={formData.generalCondition}
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

        <div className="form-group col-span-6 mt-3">
          <label
            htmlFor="spO2"
            className="block mb-1 font-medium text-gray-700"
          >
            SpO2:
          </label>

          <div className="flex gap-2">
            {/* Text input with "% at" suffix */}
            <div className="relative flex-1">
              <input
                type="text"
                id="spO2"
                name="spO2"
                value={formData.spO2}
                onChange={handleChange}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter value"
              />
              <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm pointer-events-none">
                %
              </span>
            </div>

            {/* Dropdown */}
            <select
              name="spO2Method"
              value={formData.spO2Method}
              onChange={handleChange}
              className="bg-white w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="roomAir">at Room Air</option>
              <option value="oxygen">at Oxygen Support</option>
            </select>
          </div>
        </div>

        <div className="form-group col-span-6 mt-3">
          <label
            htmlFor="pallor"
            className="block mb-1 font-medium text-gray-700"
          >
            Pallor:
          </label>
          <div className="flex justify-evenly rounded-sm h-12 mt-2 bg-white">
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="pallor-present"
                name="pallor"
                value="Present"
                checked={formData.pallor === "Present"}
                onChange={handleChange}
              />
              <span>Present</span>
            </label>
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="pallor-not-present"
                name="pallor"
                value="Not Present"
                checked={formData.pallor === "Not Present"}
                onChange={handleChange}
              />
              <span>Not Present</span>
            </label>
          </div>
        </div>

        <div className="form-group col-span-6 mt-3">
          <label
            htmlFor="icterus"
            className="block mb-1 font-medium text-gray-700"
          >
            Icterus:
          </label>
          <div className="flex justify-evenly rounded-sm h-12 mt-2 bg-white">
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="icterus-present"
                name="icterus"
                value="Present"
                checked={formData.icterus === "Present"}
                onChange={handleChange}
              />
              <span>Present</span>
            </label>
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="icterus-not-present"
                name="icterus"
                value="Not Present"
                checked={formData.icterus === "Not Present"}
                onChange={handleChange}
              />
              <span>Not Present</span>
            </label>
          </div>
        </div>

        <div className="form-group col-span-3 mt-3" style={{ position: "relative" }}>
          <label htmlFor="bloodPressure">Blood Pressure:</label>
          <input
            type="text"
            id="bloodPressure"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px 50px 8px 8px", // space for unit on the right
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "53px",
              transform: "translateY(-50%)",
              color: "#555",
              pointerEvents: "none",
            }}
          >
            mmHg
          </span>
        </div>

        <div className="form-group col-span-3 mt-3" style={{ position: "relative" }}>
          <label htmlFor="pulseRate">Pulse Rate:</label>
          <input
            type="text"
            id="pulseRate"
            name="pulseRate"
            value={formData.pulseRate}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px 50px 8px 8px", // padding-right for unit
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "53px",
              transform: "translateY(-50%)",
              color: "#555",
              pointerEvents: "none",
            }}
          >
            bpm
          </span>
        </div>

        <div className="form-group col-span-3 mt-3" style={{ position: "relative" }}>
          <label htmlFor="respiratoryRate">Respiratory Rate:</label>
          <input
            type="text"
            id="respiratoryRate"
            name="respiratoryRate"
            value={formData.respiratoryRate}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px 70px 8px 8px", // extra space for longer unit
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "53px",
              transform: "translateY(-50%)",
              color: "#555",
              pointerEvents: "none",
            }}
          >
            breaths/min
          </span>
        </div>

        <div className="form-group col-span-3 mt-3" style={{ position: "relative" }}>
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="text"
            id="temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px 50px 8px 8px",
              marginTop: "5px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "53px",
              transform: "translateY(-50%)",
              color: "#555",
              pointerEvents: "none",
            }}
          >
            °F
          </span>
        </div>
      </div>
    </div>
  );
}

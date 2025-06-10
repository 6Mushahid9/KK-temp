export function PatientDetails({
  handleChange,
  formData,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
}) {
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
        Patient Details
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
        {/* row 1 */}
        <div className="grid grid-cols-12 gap-4 mt-3">
          <div className="form-group col-span-6">
            <label htmlFor="uhidRegNo">UHID/Reg. No.:</label>
            <input
              type="text"
              id="uhidRegNo"
              name="uhidRegNo"
              value={formData.uhidRegNo}
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

          <div className="form-group col-span-6">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
              }}
            >
              <option value="">Select Department</option>
              <option value="ECHS">ECHS</option>
              <option value="CGHS">CGHS</option>
              <option value="NR">NR</option>
              <option value="NER">NER</option>
              <option value="ESIC">ESIC</option>
              <option value="RDSO">RDSO</option>
              <option value="INSURRANCE">INSURRANCE</option>
              <option value="CMRF">CMRF</option>
              <option value="CAPF">CAPF</option>
              <option value="AYUSHMAN BHARAT">AYUSHMAN BHARAT</option>
              <option value="DEEN DAYAL UPADHYAY">DEEN DAYAL UPADHYAY</option>
              <option value="UPPCL">UPPCL</option>
              <option value="UP-POLICE">UP-POLICE</option>
              <option value="BSNL">BSNL</option>
              <option value="FCI">FCI</option>
              <option value="RAIL-COACH">RAIL-COACH</option>
              <option value="RBI">RBI</option>
            </select>
          </div>
        </div>

        {/* row 2 */}
        <div className="grid grid-cols-12 gap-4 mt-3">
          <div className="form-group col-span-6">
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
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

          <div className="form-group col-span-3">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
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

          <div className="form-group col-span-3">
            <label htmlFor="sex">Sex:</label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                color: "#333",
              }}
            >
              <option value="" disabled>
                Select your sex
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>

        {/* row 3 */}
        <div className="grid grid-cols-12 gap-4 mt-3">
          <div className="form-group col-span-6">
            <label htmlFor="husbandName">Father's / Husband's Name:</label>
            <input
              type="text"
              id="husbandName"
              name="husbandName"
              value={formData.husbandName}
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

          <div className="form-group col-span-6">
            <label htmlFor="consultantInCharge">Consultant(s) In Charge:</label>
            <input
              type="text"
              id="consultantInCharge"
              name="consultantInCharge"
              value={formData.consultantInCharge}
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

        {/* row 4 */}
        <div className="grid grid-cols-12 gap-4 mt-3">
          <div className="form-group col-span-12">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
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

        {/* row 5 */}
        <div className="grid grid-cols-12 gap-4 mt-3">
          <div className="form-group col-span-3">
            <label htmlFor="dateTimeAdmission">Date of Admission:</label>
            <input
              type="date"
              id="dateAdmission"
              name="dateAdmission"
              value={formData.dateAdmission}
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
          <div className="form-group col-span-3">
            <label htmlFor="timeAdmission">Time of Admission:</label>
            <input
              type="time"
              id="timeAdmission"
              name="timeAdmission"
              value={formData.timeAdmission}
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

          <div className="form-group col-span-3">
            <label htmlFor="dateDischarge">Date of Discharge:</label>
            <input
              type="date"
              id="dateDischarge"
              name="dateDischarge"
              value={formData.dateDischarge}
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

          <div className="form-group col-span-3">
            <label htmlFor="timeAdmission">Time of Discharge:</label>
            <input
              type="time"
              id="timeDischarge"
              name="timeDischarge"
              value={formData.timeDischarge}
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

        {/* row 6 */}
        <div className="grid grid-cols-12 gap-4 mt-3">
          <div className="form-group col-span-8">
            <label>Treatment / Procedure:</label>
            <div className="flex justify-evenly rounded-sm h-12 mt-2 bg-white">
              <label className="!flex !items-center whitespace-nowrap gap-2">
                <input
                  type="radio"
                  name="procedure"
                  value="Conservative Management"
                  checked={formData.procedure === "Conservative Management"}
                  onChange={handleChange}
                />
                <span>Conservative Management</span>
              </label>
              <label className="!flex !items-center whitespace-nowrap gap-2">
                <input
                  type="radio"
                  name="procedure"
                  value="Surgical Management"
                  checked={formData.procedure === "Surgical Management"}
                  onChange={handleChange}
                />
                Surgical Management
              </label>
            </div>
          </div>

          <div className="form-group col-span-4">
            <label htmlFor="bedNo">Bed Number:</label>
            <input
              type="text"
              id="bedNo"
              name="bedNo"
              value={formData.bedNo}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded border border-gray-300"
            />
          </div>
        </div>

        {/* row 7 */}
        <div className="mt-3 border-2 border-gray-300 rounded-md p-4">
          <h2 className="text-left font-semibold">Discharge Diagnosis</h2>
          {formData.dischargeDiagnosis.map((item, index) => (
            <div key={index} className="mt-3 flex gap-2.5">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    "dischargeDiagnosis",
                    e.target.value,
                    "dischargeDiagnosis"
                  )
                }
                placeholder={`Discharge Diagnosis ${index + 1}`}
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("dischargeDiagnosis", index)}
                  className="bg-pink-700 hover:bg-red-500 text-white px-4 py-0.5 cursor-pointer rounded-sm font-semibold"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <div className="flex flex-initial">
            <button
              type="button"
              onClick={() => addArrayItem("dischargeDiagnosis", "")}
              className=" text-white px-3 py-2 rounded-sm cursor-pointer mt-2.5 bg-[#4c9e92] hover:bg-[#5fc1b2] transition-colors duration-300"
            >
              Add +
            </button>
          </div>
        </div>

        {/* row 8 */}
        <div className="mt-3 border-2 border-gray-300 rounded-md p-4">
          <h2 className="text-left font-semibold">Presenting Complaints</h2>

          {formData.presentingComplaints.map((item, index) => (
            <div key={index} className="mt-3 flex gap-2.5">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    "presentingComplaints",
                    e.target.value,
                    "presentingComplaints"
                  )
                }
                placeholder={`Presenting Complaint ${index + 1}`}
                className="flex-1 border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("presentingComplaints", index)}
                  className="bg-pink-700 hover:bg-red-500 text-white px-4 py-2.5 cursor-pointer rounded-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <div className="flex flex-initial">
            <button
              type="button"
              onClick={() => addArrayItem("presentingComplaints", "")}
              className="text-white px-3 py-2 rounded-sm cursor-pointer mt-2.5 bg-[#4c9e92] hover:bg-[#5fc1b2] transition-colors duration-300"
            >
              Add +
            </button>
          </div>
        </div>

        {/* row 9 */}
        <div className="mt-3 border-2 border-gray-300 rounded-md p-4">
          <h2 className="text-left font-semibold">
            Known Comorbidities / Past Medical History
          </h2>

          {formData.pastMedicalHistory.map((item, index) => (
            <div key={index} className="mt-3 flex gap-2.5">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    "pastMedicalHistory",
                    e.target.value,
                    "pastMedicalHistory"
                  )
                }
                placeholder={`Past Medical History ${index + 1}`}
                className="flex-1 border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("pastMedicalHistory", index)}
                  className="bg-pink-700 hover:bg-red-500 text-white px-4 py-2.5 cursor-pointer rounded-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <div className="flex flex-initial">
            <button
              type="button"
              onClick={() => addArrayItem("pastMedicalHistory", "")}
              className="text-white px-3 py-2 rounded-sm cursor-pointer mt-2.5 bg-[#4c9e92] hover:bg-[#5fc1b2] transition-colors duration-300"
            >
              Add +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

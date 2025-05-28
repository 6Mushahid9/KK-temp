export function PatientDetails({handleChange, formData}) {
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

            <div
                style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}
            >
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
                            <option value="General Medicine">General Medicine</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Radiology">Radiology</option>
                            <option value="Emergency">Emergency</option>
                            <option value="ENT">ENT</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Gastroenterology">Gastroenterology</option>
                            <option value="Gynecology">Gynecology</option>
                            <option value="Psychiatry">Psychiatry</option>
                            <option value="Urology">Urology</option>
                            <option value="Nephrology">Nephrology</option>
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
                        <label htmlFor="consultantInCharge">
                            Consultant(s) In Charge:
                        </label>
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
                <div className="grid grid-cols-12 gap-4 mt-3">
                    <div className="form-group col-span-12">
                        <label htmlFor="dischargeDiagnosis">Discharge Diagnosis:</label>
                        <input
                            type="text"
                            id="dischargeDiagnosis"
                            name="dischargeDiagnosis"
                            value={formData.dischargeDiagnosis}
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

                {/* row 8 */}
                <div className="grid grid-cols-12 gap-4 mt-3">
                    <div className="form-group col-span-12 ">
                        <label htmlFor="presentingCompliants">
                            Presenting Compliants:
                        </label>
                        <input
                            type="text"
                            id="presentingCompliants"
                            name="presentingCompliants"
                            value={formData.presentingCompliants}
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

                {/* row 9 */}
                <div className="grid grid-cols-12 gap-4 mt-3">
                    <div className="form-group col-span-12">
                        <label htmlFor="pastMedicalHistory">
                            Known Comorbidities / Past Medical History:
                        </label>
                        <input
                            type="text"
                            id="pastMedicalHistory"
                            name="pastMedicalHistory"
                            value={formData.pastMedicalHistory}
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
            </div>
        </div>
    )
}
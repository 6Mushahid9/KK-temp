export function PatientDetails({ handleChange, formData, handleArrayChange, addArrayItem, removeArrayItem}) {
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
                <h2
                    style={{
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "10px",
                        marginBottom: "20px",
                    }}
                >
                    Discharge Diagnosis
                </h2>
                {formData.dischargeDiagnosis.map((item, index) => (
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
                                        "dischargeDiagnosis",
                                        e.target.value,
                                        "dischargeDiagnosis"
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ddd",
                                }}
                                placeholder={`Discharge Diagnosis ${index + 1}`}
                            />
                        </div>

                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem("dischargeDiagnosis", index)}
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
                    onClick={() => addArrayItem("dischargeDiagnosis", "")}
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
                    Add Discharge Diagnosis
                </button>

                {/* row 8 */}
                <div className="grid grid-cols-12 gap-4 mt-3">
                    <div className="form-group col-span-12">
                        <h2
                            style={{
                                borderBottom: "1px solid #ddd",
                                paddingBottom: "10px",
                                marginBottom: "20px",
                            }}
                        >
                            Presenting Complaints
                        </h2>
                        {formData.presentingComplaints.map((item, index) => (
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
                                                "presentingComplaints",
                                                e.target.value,
                                                "presentingComplaints"
                                            )
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            borderRadius: "4px",
                                            border: "1px solid #ddd",
                                        }}
                                        placeholder={`Presenting Complaint ${index + 1}`}
                                    />
                                </div>

                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem("presentingComplaints", index)}
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
                            onClick={() => addArrayItem("presentingComplaints", "")}
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
                            Add Presenting Complaint
                        </button>
                    </div>
                </div>

                {/* row 9 */}
                <div className="grid grid-cols-12 gap-4 mt-3">
                    <div className="form-group col-span-12">
                        <h2
                            style={{
                                borderBottom: "1px solid #ddd",
                                paddingBottom: "10px",
                                marginBottom: "20px",
                            }}
                        >
                            Known Comorbidities / Past Medical History
                        </h2>
                        {formData.pastMedicalHistory.map((item, index) => (
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
                                                "pastMedicalHistory",
                                                e.target.value,
                                                "pastMedicalHistory"
                                            )
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "8px",
                                            borderRadius: "4px",
                                            border: "1px solid #ddd",
                                        }}
                                        placeholder={`Past Medical History ${index + 1}`}
                                    />
                                </div>

                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem("pastMedicalHistory", index)}
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
                            onClick={() => addArrayItem("pastMedicalHistory", "")}
                            style={{
                                background: "#2196F3",
                                color: "white",
                                border: "none",
                                padding: "8pxillon 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                marginTop: "10px",
                            }}
                        >
                            Add Past Medical History
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
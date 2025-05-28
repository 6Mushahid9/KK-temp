export function PatientDetails({formData}){
    <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
        <h2 className='h2' style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Patient Details</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
                <label htmlFor="patientName">Patient Name:</label>
                <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="sex">Sex:</label>
                <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginTop: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        backgroundColor: '#fff',
                        color: '#333',
                    }}
                >
                    <option value="" disabled>Select your sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="knownCaseOf">Known Case of:</label>
                <input
                    type="text"
                    id="knownCaseOf"
                    name="knownCaseOf"
                    value={formData.knownCaseOf}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="pastMedicalHistory">Past Medical History:</label>
                <input
                    type="text"
                    id="pastMedicalHistory"
                    name="pastMedicalHistory"
                    value={formData.pastMedicalHistory}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="uhidRegNo">UHID/Reg. No.:</label>
                <input
                    type="text"
                    id="uhidRegNo"
                    name="uhidRegNo"
                    value={formData.uhidRegNo}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="department">Department:</label>
                <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="husbandName">Husband's Name:</label>
                <input
                    type="text"
                    id="husbandName"
                    name="husbandName"
                    value={formData.husbandName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="consultantInCharge">Consultant/s In Charge:</label>
                <input
                    type="text"
                    id="consultantInCharge"
                    name="consultantInCharge"
                    value={formData.consultantInCharge}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="bedNo">Bed No.:</label>
                <input
                    type="text"
                    id="bedNo"
                    name="bedNo"
                    value={formData.bedNo}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="dateTimeAdmission">Date of Admission:</label>
                <input
                    type="date"
                    id="dateAdmission"
                    name="dateAdmission"
                    value={formData.dateAdmission}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="timeAdmission">Time of Admission:</label>
                <input
                    type="time"
                    id="timeAdmission"
                    name="timeAdmission"
                    value={formData.timeAdmission}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="dateDischarge">Date of Discharge:</label>
                <input
                    type="date"
                    id="dateDischarge"
                    name="dateDischarge"
                    value={formData.dateDischarge}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="timeDischarge">Time of Discharge:</label>
                <input
                    type="time"
                    id="timeDischarge"
                    name="timeDischarge"
                    value={formData.timeDischarge}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
            </div>
        </div>
    </div>
}
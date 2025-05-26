import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const DischargeSummaryForm = () => {
    const [formData, setFormData] = useState({
        // Patient Details
        patientName: '',
        age: '',
        sex:'',
        knownCaseOf: '',
        pastMedicalHistory: '',
        uhidRegNo: '',
        department: '',
        husbandName: '',
        address: '',
        consultantInCharge: '',
        bedNo: '',
        dateTimeAdmission: '',
        dateTimeDischarge: '',

        // Clinical Findings
        generalCondition: '',
        pallor: '',
        icterus: '',
        bloodPressure: '',
        pulseRate: '',
        respiratoryRate: '',
        temperature: '',
        spO2: '',
        chest: '',

        // Systemic Examination
        cns: '',
        cvs: '',
        respiratorySystem: '',
        perAbdomen: '',

        // Key Blood Investigations
        bloodInvestigations: [
            { date: '', tests: [{ name: '', value: '', unit: '' }] }
        ],

        // Radiological & Diagnostic Findings
        radiologicalFindings: [
            { date: '', description: '' }
        ],

        // Diagnosis
        diagnosis: [''],

        // Hospital Course & Treatment
        hospitalCourse: '',

        // Challenges During Treatment
        treatmentChallenges: [''],

        // Condition at Discharge
        conditionAtDischarge: '',

        // Discharge Medication
        dischargeMedication: [
            { name: '', dosage: '', duration: '' }
        ],

        // Special Instructions
        specialInstructions: '',

        // Review Date
        reviewDate: '',

        // Emergency Contact
        emergencyContact: '',
        emergencySymptoms: ['']
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleArrayChange = (index, field, value, arrayName) => {
        const updatedArray = [...formData[arrayName]];
        updatedArray[index] = value;
        setFormData({
            ...formData,
            [arrayName]: updatedArray
        });
    };

    const handleNestedArrayChange = (parentIndex, childIndex, field, value, parentArrayName) => {
        const updatedArray = [...formData[parentArrayName]];
        updatedArray[parentIndex].tests[childIndex][field] = value;
        setFormData({
            ...formData,
            [parentArrayName]: updatedArray
        });
    };

    const addArrayItem = (arrayName, defaultValue) => {
        setFormData({
            ...formData,
            [arrayName]: [...formData[arrayName], defaultValue]
        });
    };

    const removeArrayItem = (arrayName, index) => {
        const updatedArray = [...formData[arrayName]];
        updatedArray.splice(index, 1);
        setFormData({
            ...formData,
            [arrayName]: updatedArray
        });
    };

    const addBloodInvestigation = () => {
        setFormData({
            ...formData,
            bloodInvestigations: [
                ...formData.bloodInvestigations,
                { date: '', tests: [{ name: '', value: '', unit: '' }] }
            ]
        });
    };

    const addTestToInvestigation = (investigationIndex) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex].tests.push({ name: '', value: '', unit: '' });
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations
        });
    };

    const removeTestFromInvestigation = (investigationIndex, testIndex) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex].tests.splice(testIndex, 1);
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations
        });
    };

    const handleBloodInvestigationChange = (investigationIndex, field, value) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex][field] = value;
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations
        });
    };

    const handleTestChange = (investigationIndex, testIndex, field, value) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex].tests[testIndex][field] = value;
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations
        });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        let yPos = 10;

        // Title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Discharge Summary', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
        yPos += 10;

        // Patient Details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Patient Details:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Name: ${formData.patientName}`, 15, yPos);
        yPos += 5;
        doc.text(`Age: ${formData.age}`, 15, yPos);
        yPos += 5;
        doc.text(`Sex: ${formData.sex}`, 15, yPos);
        yPos += 5;
        doc.text(`Known Case of: ${formData.knownCaseOf}`, 15, yPos);
        yPos += 5;
        doc.text(`Past Medical History: ${formData.pastMedicalHistory}`, 15, yPos);
        yPos += 5;
        doc.text(`UHID/Reg. No.: ${formData.uhidRegNo}`, 15, yPos);
        yPos += 5;
        doc.text(`Department: ${formData.department}`, 15, yPos);
        yPos += 5;
        doc.text(`Husband's Name: ${formData.husbandName}`, 15, yPos);
        yPos += 5;
        doc.text(`Address: ${formData.address}`, 15, yPos);
        yPos += 5;
        doc.text(`Consultant/s In Charge: ${formData.consultantInCharge}`, 15, yPos);
        yPos += 5;
        doc.text(`Bed No.: ${formData.bedNo}`, 15, yPos);
        yPos += 5;
        doc.text(`Date & Time of Admission: ${formData.dateTimeAdmission}`, 15, yPos);
        yPos += 5;
        doc.text(`Date & Time of Discharge: ${formData.dateTimeDischarge}`, 15, yPos);
        yPos += 10;

        // Clinical Findings
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Clinical Findings (On Admission):', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`General Condition (GC): ${formData.generalCondition}`, 15, yPos);
        yPos += 5;
        doc.text(`Pallor: ${formData.pallor}`, 15, yPos);
        yPos += 5;
        doc.text(`Icterus: ${formData.icterus}`, 15, yPos);
        yPos += 5;
        doc.text(`Blood Pressure: ${formData.bloodPressure}`, 15, yPos);
        yPos += 5;
        doc.text(`Pulse Rate: ${formData.pulseRate}`, 15, yPos);
        yPos += 5;
        doc.text(`Respiratory Rate: ${formData.respiratoryRate}`, 15, yPos);
        yPos += 5;
        doc.text(`Temperature: ${formData.temperature}`, 15, yPos);
        yPos += 5;
        doc.text(`SpO2: ${formData.spO2}`, 15, yPos);
        yPos += 5;
        doc.text(`Chest: ${formData.chest}`, 15, yPos);
        yPos += 10;

        // Check if we need a new page
        if (yPos > 250) {
            doc.addPage();
            yPos = 10;
        }

        // Systemic Examination
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Systemic Examination:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Central Nervous System (CNS): ${formData.cns}`, 15, yPos);
        yPos += 5;
        doc.text(`Cardiovascular System (CVS): ${formData.cvs}`, 15, yPos);
        yPos += 5;
        doc.text(`Respiratory System: ${formData.respiratorySystem}`, 15, yPos);
        yPos += 5;
        doc.text(`Per/Abdomen (P/A): ${formData.perAbdomen}`, 15, yPos);
        yPos += 10;

        // Key Blood Investigations
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Key Blood Investigations (Pathology):', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        formData.bloodInvestigations.forEach((investigation, index) => {
            doc.text(`${investigation.date}:`, 15, yPos);
            yPos += 5;

            investigation.tests.forEach((test) => {
                doc.text(`${test.name}: ${test.value} ${test.unit}`, 20, yPos);
                yPos += 5;
            });

            if (index < formData.bloodInvestigations.length - 1) {
                yPos += 2;
            }

            // Check if we need a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 10;
            }
        });
        yPos += 5;

        // Radiological & Diagnostic Findings
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Radiological & Diagnostic Findings:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        formData.radiologicalFindings.forEach((finding) => {
            doc.text(`${finding.date}`, 15, yPos);
            yPos += 5;

            // Split long descriptions into multiple lines
            const descriptionLines = doc.splitTextToSize(finding.description, 180);
            descriptionLines.forEach((line) => {
                doc.text(line, 20, yPos);
                yPos += 5;
            });

            // Check if we need a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 10;
            }
        });
        yPos += 5;

        // Diagnosis
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Diagnosis:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        formData.diagnosis.forEach((item, index) => {
            doc.text(`${index + 1}. ${item}`, 15, yPos);
            yPos += 5;

            // Check if we need a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 10;
            }
        });
        yPos += 5;

        // Hospital Course & Treatment
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Hospital Course & Treatment Administered:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        const hospitalCourseLines = doc.splitTextToSize(formData.hospitalCourse, 180);
        hospitalCourseLines.forEach((line) => {
            doc.text(line, 15, yPos);
            yPos += 5;

            // Check if we need a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 10;
            }
        });
        yPos += 5;

        // Challenges During Treatment
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Challenges During Treatment & Reasons for Prolonged Hospitalization:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        formData.treatmentChallenges.forEach((challenge, index) => {
            doc.text(`${index + 1}. ${challenge}`, 15, yPos);
            yPos += 5;

            // Check if we need a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 10;
            }
        });
        yPos += 5;

        // Condition at Discharge
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Condition at Discharge:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(formData.conditionAtDischarge, 15, yPos);
        yPos += 10;

        // Check if we need a new page
        if (yPos > 250) {
            doc.addPage();
            yPos = 10;
        }

        // Discharge Medication
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Discharge Medication:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        formData.dischargeMedication.forEach((medication, index) => {
            doc.text(`${index + 1}. ${medication.name} – ${medication.dosage} for ${medication.duration}`, 15, yPos);
            yPos += 5;

            // Check if we need a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 10;
            }
        });
        yPos += 5;

        // Special Instructions
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Special Instruction/s:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(formData.specialInstructions, 15, yPos);
        yPos += 10;

        // Review Date
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Review Date:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Follow-up: ${formData.reviewDate}`, 15, yPos);
        yPos += 10;

        // Emergency Contact
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('In case any of these symptoms persist, please contact immediately on:', 10, yPos);
        yPos += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(formData.emergencyContact, 15, yPos);
        yPos += 5;

        formData.emergencySymptoms.forEach((symptom, index) => {
            doc.text(`${index + 1}. ${symptom}`, 15, yPos);
            yPos += 5;
        });

        // Save the PDF
        doc.save('discharge-summary.pdf');
    };

    return (
        <div className="discharge-summary-form" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Discharge Summary Form</h1>

            <form>
                {/* Patient Details Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Patient Details</h2>

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
                            <label htmlFor="ageSex">Age:</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ageSex">Sex:</label>
                            <input
                                type="text"
                                id="sex"
                                name="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
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
                            <label htmlFor="dateTimeAdmission">Date & Time of Admission:</label>
                            <input
                                type="text"
                                id="dateTimeAdmission"
                                name="dateTimeAdmission"
                                value={formData.dateTimeAdmission}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateTimeDischarge">Date & Time of Discharge:</label>
                            <input
                                type="text"
                                id="dateTimeDischarge"
                                name="dateTimeDischarge"
                                value={formData.dateTimeDischarge}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Clinical Findings Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Clinical Findings (On Admission)</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label htmlFor="generalCondition">General Condition (GC):</label>
                            <input
                                type="text"
                                id="generalCondition"
                                name="generalCondition"
                                value={formData.generalCondition}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pallor">Pallor:</label>
                            <input
                                type="text"
                                id="pallor"
                                name="pallor"
                                value={formData.pallor}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="icterus">Icterus:</label>
                            <input
                                type="text"
                                id="icterus"
                                name="icterus"
                                value={formData.icterus}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bloodPressure">Blood Pressure:</label>
                            <input
                                type="text"
                                id="bloodPressure"
                                name="bloodPressure"
                                value={formData.bloodPressure}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pulseRate">Pulse Rate:</label>
                            <input
                                type="text"
                                id="pulseRate"
                                name="pulseRate"
                                value={formData.pulseRate}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="respiratoryRate">Respiratory Rate:</label>
                            <input
                                type="text"
                                id="respiratoryRate"
                                name="respiratoryRate"
                                value={formData.respiratoryRate}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="temperature">Temperature:</label>
                            <input
                                type="text"
                                id="temperature"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="spO2">SpO2:</label>
                            <input
                                type="text"
                                id="spO2"
                                name="spO2"
                                value={formData.spO2}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / span 2' }}>
                            <label htmlFor="chest">Chest:</label>
                            <input
                                type="text"
                                id="chest"
                                name="chest"
                                value={formData.chest}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Systemic Examination Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Systemic Examination</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                        <div className="form-group">
                            <label htmlFor="cns">Central Nervous System (CNS):</label>
                            <textarea
                                id="cns"
                                name="cns"
                                value={formData.cns}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '60px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvs">Cardiovascular System (CVS):</label>
                            <input
                                type="text"
                                id="cvs"
                                name="cvs"
                                value={formData.cvs}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="respiratorySystem">Respiratory System:</label>
                            <input
                                type="text"
                                id="respiratorySystem"
                                name="respiratorySystem"
                                value={formData.respiratorySystem}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="perAbdomen">Per/Abdomen (P/A):</label>
                            <input
                                type="text"
                                id="perAbdomen"
                                name="perAbdomen"
                                value={formData.perAbdomen}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Key Blood Investigations Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Key Blood Investigations (Pathology)</h2>

                    {formData.bloodInvestigations.map((investigation, investigationIndex) => (
                        <div key={investigationIndex} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div className="form-group" style={{ width: '60%' }}>
                                    <label htmlFor={`investigation-date-${investigationIndex}`}>Date:</label>
                                    <input
                                        type="text"
                                        id={`investigation-date-${investigationIndex}`}
                                        value={investigation.date}
                                        onChange={(e) => handleBloodInvestigationChange(investigationIndex, 'date', e.target.value)}
                                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    />
                                </div>

                                {investigationIndex > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('bloodInvestigations', investigationIndex)}
                                        style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Remove Date
                                    </button>
                                )}
                            </div>

                            {investigation.tests.map((test, testIndex) => (
                                <div key={testIndex} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '10px', marginBottom: '10px' }}>
                                    <div className="form-group">
                                        <label htmlFor={`test-name-${investigationIndex}-${testIndex}`}>Test Name:</label>
                                        <input
                                            type="text"
                                            id={`test-name-${investigationIndex}-${testIndex}`}
                                            value={test.name}
                                            onChange={(e) => handleTestChange(investigationIndex, testIndex, 'name', e.target.value)}
                                            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`test-value-${investigationIndex}-${testIndex}`}>Value:</label>
                                        <input
                                            type="text"
                                            id={`test-value-${investigationIndex}-${testIndex}`}
                                            value={test.value}
                                            onChange={(e) => handleTestChange(investigationIndex, testIndex, 'value', e.target.value)}
                                            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`test-unit-${investigationIndex}-${testIndex}`}>Unit:</label>
                                        <input
                                            type="text"
                                            id={`test-unit-${investigationIndex}-${testIndex}`}
                                            value={test.unit}
                                            onChange={(e) => handleTestChange(investigationIndex, testIndex, 'unit', e.target.value)}
                                            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        />
                                    </div>

                                    {testIndex > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTestFromInvestigation(investigationIndex, testIndex)}
                                            style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', alignSelf: 'end', marginBottom: '5px' }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => addTestToInvestigation(investigationIndex)}
                                style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                            >
                                Add Test
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addBloodInvestigation}
                        style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Add Investigation Date
                    </button>
                </div>

                {/* Radiological & Diagnostic Findings Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Radiological & Diagnostic Findings</h2>

                    {formData.radiologicalFindings.map((finding, index) => (
                        <div key={index} style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div className="form-group" style={{ width: '60%' }}>
                                    <label htmlFor={`finding-date-${index}`}>Date:</label>
                                    <input
                                        type="text"
                                        id={`finding-date-${index}`}
                                        value={finding.date}
                                        onChange={(e) => {
                                            const updatedFindings = [...formData.radiologicalFindings];
                                            updatedFindings[index].date = e.target.value;
                                            setFormData({
                                                ...formData,
                                                radiologicalFindings: updatedFindings
                                            });
                                        }}
                                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    />
                                </div>

                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('radiologicalFindings', index)}
                                        style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor={`finding-description-${index}`}>Description:</label>
                                <textarea
                                    id={`finding-description-${index}`}
                                    value={finding.description}
                                    onChange={(e) => {
                                        const updatedFindings = [...formData.radiologicalFindings];
                                        updatedFindings[index].description = e.target.value;
                                        setFormData({
                                            ...formData,
                                            radiologicalFindings: updatedFindings
                                        });
                                    }}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => addArrayItem('radiologicalFindings', { date: '', description: '' })}
                        style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Add Finding
                    </button>
                </div>

                {/* Diagnosis Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Diagnosis</h2>

                    {formData.diagnosis.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleArrayChange(index, 'diagnosis', e.target.value, 'diagnosis')}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    placeholder={`Diagnosis ${index + 1}`}
                                />
                            </div>

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('diagnosis', index)}
                                    style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => addArrayItem('diagnosis', '')}
                        style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Add Diagnosis
                    </button>
                </div>

                {/* Hospital Course & Treatment Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Hospital Course & Treatment Administered</h2>

                    <div className="form-group">
                        <textarea
                            id="hospitalCourse"
                            name="hospitalCourse"
                            value={formData.hospitalCourse}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '120px' }}
                        />
                    </div>
                </div>

                {/* Challenges During Treatment Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Challenges During Treatment & Reasons for Prolonged Hospitalization</h2>

                    {formData.treatmentChallenges.map((challenge, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    value={challenge}
                                    onChange={(e) => handleArrayChange(index, 'treatmentChallenges', e.target.value, 'treatmentChallenges')}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    placeholder={`Challenge ${index + 1}`}
                                />
                            </div>

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('treatmentChallenges', index)}
                                    style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => addArrayItem('treatmentChallenges', '')}
                        style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Add Challenge
                    </button>
                </div>

                {/* Condition at Discharge Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Condition at Discharge</h2>

                    <div className="form-group">
                        <input
                            type="text"
                            id="conditionAtDischarge"
                            name="conditionAtDischarge"
                            value={formData.conditionAtDischarge}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                </div>

                {/* Discharge Medication Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Discharge Medication</h2>

                    {formData.dischargeMedication.map((medication, index) => (
                        <div key={index} style={{ marginBottom: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '10px' }}>
                            <div className="form-group">
                                <label htmlFor={`medication-name-${index}`}>Medication:</label>
                                <input
                                    type="text"
                                    id={`medication-name-${index}`}
                                    value={medication.name}
                                    onChange={(e) => {
                                        const updatedMedications = [...formData.dischargeMedication];
                                        updatedMedications[index].name = e.target.value;
                                        setFormData({
                                            ...formData,
                                            dischargeMedication: updatedMedications
                                        });
                                    }}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor={`medication-dosage-${index}`}>Dosage:</label>
                                <input
                                    type="text"
                                    id={`medication-dosage-${index}`}
                                    value={medication.dosage}
                                    onChange={(e) => {
                                        const updatedMedications = [...formData.dischargeMedication];
                                        updatedMedications[index].dosage = e.target.value;
                                        setFormData({
                                            ...formData,
                                            dischargeMedication: updatedMedications
                                        });
                                    }}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor={`medication-duration-${index}`}>Duration:</label>
                                <input
                                    type="text"
                                    id={`medication-duration-${index}`}
                                    value={medication.duration}
                                    onChange={(e) => {
                                        const updatedMedications = [...formData.dischargeMedication];
                                        updatedMedications[index].duration = e.target.value;
                                        setFormData({
                                            ...formData,
                                            dischargeMedication: updatedMedications
                                        });
                                    }}
                                    style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                                />
                            </div>

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('dischargeMedication', index)}
                                    style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', alignSelf: 'end', marginBottom: '5px' }}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => addArrayItem('dischargeMedication', { name: '', dosage: '', duration: '' })}
                        style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Add Medication
                    </button>
                </div>

                {/* Special Instructions Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Special Instruction/s</h2>

                    <div className="form-group">
                        <textarea
                            id="specialInstructions"
                            name="specialInstructions"
                            value={formData.specialInstructions}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px' }}
                        />
                    </div>
                </div>

                {/* Review Date Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Review Date</h2>

                    <div className="form-group">
                        <label htmlFor="reviewDate">Follow-up:</label>
                        <input
                            type="text"
                            id="reviewDate"
                            name="reviewDate"
                            value={formData.reviewDate}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                </div>

                {/* Emergency Contact Section */}
                <div className="form-section" style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
                    <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Emergency Contact Information</h2>

                    <div className="form-group">
                        <label htmlFor="emergencyContact">Contact Number:</label>
                        <input
                            type="text"
                            id="emergencyContact"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                            placeholder="e.g., 0522-2619049/50 or 2231932"
                        />
                    </div>

                    <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Symptoms to watch for:</h3>

                    {formData.emergencySymptoms.map((symptom, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    type="text"
                                    value={symptom}
                                    onChange={(e) => handleArrayChange(index, 'emergencySymptoms', e.target.value, 'emergencySymptoms')}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                    placeholder={`Symptom ${index + 1}`}
                                />
                            </div>

                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeArrayItem('emergencySymptoms', index)}
                                    style={{ background: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => addArrayItem('emergencySymptoms', '')}
                        style={{ background: '#2196F3', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
                    >
                        Add Symptom
                    </button>
                </div>

                {/* Generate PDF Button */}
                <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '50px' }}>
                    <button
                        type="button"
                        onClick={generatePDF}
                        style={{
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            padding: '12px 30px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        Generate Discharge Summary PDF
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DischargeSummaryForm;
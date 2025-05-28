import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generatePDF(formData) {
    const doc = new jsPDF();
    let yPos = 10;

    // Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Discharge Summary', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
    yPos += 10;


    // Patient Details Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Details:', 10, yPos);
    yPos += 4;

    autoTable(doc, {
        startY: yPos,
        head: [['Field', 'Value']],
        body: [
            ['Name', formData.patientName],
            ['Age', formData.age],
            ['Sex', formData.sex],
            ['Known Case of', formData.knownCaseOf],
            ['Past Medical History', formData.pastMedicalHistory],
            ['UHID/Reg. No.', formData.uhidRegNo],
            ['Department', formData.department],
            ["Husband's Name", formData.husbandName],
            ['Address', formData.address],
            ['Consultant/s In Charge', formData.consultantInCharge],
            ['Bed No.', formData.bedNo],
            ['Date & Time of Admission', `${formData.dateAdmission}, ${formData.timeAdmission}`],
            ['Date & Time of Discharge', `${formData.dateDischarge}, ${formData.timeDischarge}`],
        ],
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: {
            fillColor: [169, 169, 169],  // Background color (RGB)
            textColor: 255,             // Text color (255 = white)
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 60, fontStyle: 'bold' },
            1: { cellWidth: 'auto', fontStyle: 'normal' },
        }
    });

    yPos = doc.lastAutoTable.finalY + 10; // continue from below the table

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
    doc.text(`Blood Pressure: ${formData.bloodPressure} mmHg`, 15, yPos);
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


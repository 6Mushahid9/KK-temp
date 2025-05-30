import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function generatePDF(formData, isPreview=false) {
    const doc = new jsPDF();
    let yPos = 50;

    function convertTo12Hour(time24) {
        const [hours, minutes] = time24.split(':');
        const date = new Date();
        date.setHours(+hours);
        date.setMinutes(+minutes);

        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
      }

    const title = 'Discharge Summary';
    doc.setFontSize(25);
    doc.setFont('helvetica', 'bold');

    yPos = yPos+34

    // Centered X position
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    const y = 60;

    doc.text(title, x, y);

    // Underline
    doc.setLineWidth(0.5); // thickness of underline
    doc.line(x, y + 2, x + textWidth, y + 2); // draw a line under the text


    // Patient Details Table
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Details:', 10, yPos);
    yPos += 7;

    autoTable(doc, {
        startY: yPos,
        head: [['UHID/Reg. No.', formData.uhidRegNo]],
        body: [
            [],
            ['Department', formData.department],
            ['Patient Name', formData.patientName],
            ['Age', formData.age],
            ['Sex', formData.sex],
            ["Husband's Name", formData.husbandName],
            ['Address', formData.address],
            ['Consultant/s In Charge', formData.consultantInCharge],
            ['Bed No.', formData.bedNo],
            ['Date & Time of Admission', `${formData.dateAdmission}, ${convertTo12Hour(formData.timeAdmission)}`],
            ['Date & Time of Discharge', `${formData.dateDischarge}, ${convertTo12Hour(formData.timeDischarge)}`],
            [
                'Discharge Diagnosis',
                formData.dischargeDiagnosis
                    .map((item, index) => `${index + 1}) ${item}`)
                    .join('\n')
                    .trim() || 'N/A', // Fallback to 'N/A' if array is empty
              ],
            ['Presenting Complaints', 
                formData.presentingComplaints
                    .map((item, index) => `${index + 1}) ${item}`)
                    .join('\n')
                    .trim() || 'N/A', // Fallback to 'N/A' if array is empty
            ],
            ['Known Comorbidities/Past Medical History', 
                formData.pastMedicalHistory
                    .map((item, index) => `${index + 1}) ${item}`)
                    .join('\n')
                    .trim() || 'N/A', // Fallback to 'N/A' if array is empty
            ],
            ['Treatment/Procedure', formData.procedure],
        ],
        didParseCell: function (data) {
            data.cell.styles.lineColor = [0, 0, 0]; // black
            data.cell.styles.cellPadding = 2; 
            if (data.row.index === 0 && data.section === 'body') { // Row 1 (second row)
                data.cell.styles.cellPadding = 0.3; // Reduce vertical padding
            }
          },
        theme: 'grid',
        styles: { fontSize: 10 },
        headStyles: {
            fillColor: [0, 0, 0],  // Background color (RGB)
            textColor: 255,             // Text color (255 = white)
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 60, fontStyle: 'bold', textColor: 0},
            1: { cellWidth: 'auto', fontStyle: 'normal' },
        },
    });

    // After autoTabl
    // yPos = doc.lastAutoTable.finalY + 10;
    doc.addPage();
    yPos = 20; // Reset for new page content

    // Add extra spacing
    yPos += 4;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    yPos += 24; // space after the line before next heading


    // Clinical Findings
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('Clinical Findings (On Admission):', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);


    const bullet = '•';
    const indent = 15;
    const lineHeight = 5;

    // Each field: bold label + normal value in same line
    const findings = [
        { label: 'General Condition (GC)', value: formData.generalCondition },
        { label: 'Pallor', value: formData.pallor },
        { label: 'Icterus', value: formData.icterus },
        { label: 'Blood Pressure', value: `${formData.bloodPressure} mmHg` },
        { label: 'Pulse Rate', value: `${formData.pulseRate} bpm` },
        { label: 'Respiratory Rate', value: `${formData.respiratoryRate} breaths/min` },
        { label: 'Temperature', value: `${formData.temperature} °F` },
        { label: 'SpO2', value: `${formData.spO2} ${formData.spO2Method}` },
        { label: 'Chest', value: formData.chest }
    ];

    findings.forEach(({ label, value }) => {
        doc.setFont('helvetica', 'normal');
        doc.text(`${bullet} `, indent, yPos); // draw bullet

        const bulletWidth = doc.getTextWidth(`${bullet} `);
        doc.setFont('helvetica', 'bold');
        doc.text(`${label}: `, indent + bulletWidth, yPos); // bold label

        const labelWidth = doc.getTextWidth(`${label}: `);
        doc.setFont('helvetica', 'normal');
        doc.text(`${value}`, indent + bulletWidth + labelWidth, yPos); // normal value

        yPos += lineHeight+5 ;
    });

    // Add extra spacing
    yPos += 4;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    yPos += 14; // space after the line before next heading

    // Systemic Examination
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Systemic Examination:', 10, yPos);
    yPos += 6;

    doc.setFontSize(10);

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

    // // Save the PDF
    // doc.save('discharge-summary.pdf');

    // Return Data URL for preview or save the PDF
    if (isPreview) {
        return doc.output('datauristring');
    } else {
        doc.save('discharge-summary.pdf');
    }
};


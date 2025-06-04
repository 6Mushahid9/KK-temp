import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { LogoBase64 } from './LogoBase64';

export function generatePDF(formData, isPreview = false) {
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
    doc.setFont('times', 'bold');

    yPos = yPos + 34

    // Centered X position
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const x = (pageWidth - textWidth) / 2;
    const y = 60;

    // 👇 ADD YOUR BASE64 IMAGE HERE (replace with actual Base64 string)
    // 👇 Add logo image above title
    doc.addImage(LogoBase64, 'PNG', (pageWidth - 30) / 2, 15, 30, 30); // centered at top


    doc.text(title, x, y);

    // Underline
    doc.setLineWidth(0.5); // thickness of underline
    doc.line(x, y + 2, x + textWidth, y + 2); // draw a line under the text


    // Patient Details Table
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
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
            ['Discharge Diagnosis',
                formData.dischargeDiagnosis.length === 1
                    ? formData.dischargeDiagnosis[0]
                    : formData.dischargeDiagnosis
                        .map((item, index) => `${index + 1}) ${item}`)
                        .join('\n')
                        .trim() || 'N/A',
            ],
            ['Presenting Complaints',
                formData.presentingComplaints.length === 1
                    ? formData.presentingComplaints[0]
                    : formData.presentingComplaints
                        .map((item, index) => `${index + 1}) ${item}`)
                        .join('\n')
                        .trim() || 'N/A',
            ],
            ['Known Comorbidities/Past Medical History',
                formData.pastMedicalHistory.length === 1
                    ? formData.pastMedicalHistory[0]
                    : formData.pastMedicalHistory
                        .map((item, index) => `${index + 1}) ${item}`)
                        .join('\n')
                        .trim() || 'N/A',
            ],
            ['Treatment/Procedure', formData.procedure],
        ],
        didParseCell: function (data) {
            data.cell.styles.lineColor = [0, 0, 0];
            data.cell.styles.cellPadding = 2;
            if (data.row.index === 0 && data.section === 'body') {
                data.cell.styles.cellPadding = 0.3;
            }
        },
        theme: 'grid',
        styles: {
            font: 'times',      // 👈 Set font to Times
            fontSize: 10,
            textColor: 0
        },
        headStyles: {
            font: 'times',      // 👈 Set font to Times for header
            fillColor: [0, 0, 0],
            textColor: 255,
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 60, font: 'times', fontStyle: 'bold', textColor: 0 },
            1: { cellWidth: 'auto', font: 'times', fontStyle: 'normal' },
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
    doc.setFont('times', 'bold');
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
        { label: 'Pulse Rate', value: `${formData.pulseRate} beats/min` },
        { label: 'Respiratory Rate', value: `${formData.respiratoryRate} breaths/min` },
        { label: 'Temperature', value: `${formData.temperature}°F` },
        { label: 'SpO2', value: `${formData.spO2}% ${formData.spO2Method}` }
    ];

    findings.forEach(({ label, value }) => {
        doc.setFont('times', 'normal');
        doc.text(`${bullet} `, indent, yPos); // draw bullet

        const bulletWidth = doc.getTextWidth(`${bullet} `);
        doc.setFont('times', 'bold');
        doc.text(`${label}: `, indent + bulletWidth, yPos); // bold label

        const labelWidth = doc.getTextWidth(`${label}: `);
        doc.setFont('times', 'normal');
        doc.text(`${value}`, indent + bulletWidth + labelWidth, yPos); // normal value

        yPos += lineHeight + 5;
    });

    // Add extra spacing
    yPos += 4;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    yPos += 20; // space after the line before next heading

    // Systemic Examination
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Systemic Examination:', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    const systemicFindings = [
        { label: 'Central Nervous System (CNS)', value: formData.cns },
        { label: 'Cardiovascular System (CVS)', value: `${formData.cvs}` },
        { label: 'Respiratory System', value: formData.respiratorySystem },
        { label: 'Per/Abdomen (P/A)', value: formData.perAbdomen },
        { label: 'Bowel Sounds', value: formData.bowelSounds }
    ];

    systemicFindings.forEach(({ label, value }) => {
        doc.setFont('times', 'normal');
        doc.setFontSize(16);
        doc.text(`${bullet} `, indent, yPos);

        doc.setFontSize(12);


        const bulletWidth = doc.getTextWidth(`${bullet} `);
        doc.setFont('times', 'bold');
        doc.text(`${label}: `, indent + bulletWidth, yPos);

        const labelWidth = doc.getTextWidth(`${label}: `);

        // Special handling for CVS field with S₁ S₂
        if (label === 'Cardiovascular System (CVS)') {
            const xStart = indent + bulletWidth + labelWidth;
            doc.setFontSize(12);
            doc.setFont('times', 'normal');
            doc.text(' S', xStart, yPos);
            let s1Width = doc.getTextWidth('S');

            doc.setFontSize(8);
            doc.text(' 1', xStart + s1Width, yPos + 1);

            const s1TotalWidth = doc.getTextWidth('S1');

            doc.setFontSize(12);
            doc.text(' S', xStart + s1TotalWidth + 1, yPos);

            let s2Width = doc.getTextWidth(' S');

            doc.setFontSize(8);
            doc.text('2', xStart + s1TotalWidth + 1 + s2Width, yPos + 1);

            // Now print the rest of the value
            doc.setFontSize(12);
            doc.text(` ${value}`, xStart + s1TotalWidth + 1 + s2Width + doc.getTextWidth('2 '), yPos);
        } else {
            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            doc.text(value, indent + bulletWidth + labelWidth, yPos);
        }

        yPos += lineHeight + 5;
    });

    // Add extra spacing
    yPos += 4;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    yPos += 20; // space after the line before next heading

    doc.addPage();
    yPos = 20; // Reset for new page content


    yPos += 6;
    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;

    // Key Blood Investigations
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Key Blood Investigations (Pathology):', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    formData.bloodInvestigations.forEach((investigation, index) => {
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        if (index === 0) {
            doc.text(`${bullet} ${investigation.date} (On Admission):`, indent, yPos);
        } else {
            doc.text(`${bullet} ${investigation.date}:`, indent, yPos);
        }

        yPos += 8;

        investigation.tests.forEach((test) => {
            const xStart = indent + 5;
            const yStart = yPos;

            // Test name
            doc.setFont('times', 'bold');
            doc.setFontSize(12);
            doc.text(`-> ${test.name}: `, xStart, yStart);
            const nameWidth = doc.getTextWidth(`-> ${test.name}: `);

            let xCurrent = xStart + nameWidth;

            // Test value (with superscript if needed)
            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            xCurrent = renderTextWithSuperscript(doc, test.value, xCurrent, yStart);

            // Small gap between value and unit
            doc.text(' ', xCurrent, yStart);
            xCurrent += 1;

            // Unit (with superscript if needed)
            xCurrent = renderTextWithSuperscript(doc, test.unit, xCurrent, yStart);

            yPos += lineHeight + 3;

            // Add page if space exceeds
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
        });

        yPos += 4; // Extra space between dates
    });

    function renderTextWithSuperscript(doc, text, x, y) {
        let i = 0;
        let xPos = x;
        doc.setFontSize(12);

        while (i < text.length) {
            if (text[i] === '^') {
                i++; // move past ^
                let superText = '';
                while (i < text.length && text[i] !== ' ') {
                    superText += text[i];
                    i++;
                }
                doc.setFontSize(8);
                doc.text(superText, xPos, y - 1.5);
                xPos += doc.getTextWidth(superText);
                doc.setFontSize(10);
            } else {
                let normalText = '';
                while (i < text.length && text[i] !== '^') {
                    normalText += text[i];
                    i++;
                }
                doc.text(normalText, xPos, y);
                xPos += doc.getTextWidth(normalText);
            }
        }

        return xPos;
    }


    yPos += 6;
    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;




    doc.addPage();
    yPos = 20; // Reset for new page content




    yPos += 6;
    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;




    // Radiological & Diagnostic Findings
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Radiological & Diagnostic Findings:', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    formData.radiologicalFindings.forEach((finding, index) => {
        // Bullet and Date Line
        const bullet = '\u2022'; // Unicode bullet
        const indent = 15;

        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text(`${bullet} ${finding.name} (${finding.date}):`, indent, yPos);
        yPos += 8;

        // Description lines
        finding.descriptions.forEach((desc) => {
            const descriptionLines = doc.splitTextToSize(desc, 180);
            descriptionLines.forEach((line) => {
                doc.setFont('times', 'normal');
                doc.setFontSize(12);
                doc.text(`-> ${line}`, indent + 5, yPos);
                yPos += 6;

                // Add page if needed
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
            });
        });

        yPos += 4; // Extra space after each finding
    });


    yPos += 6;
    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;




    // Diagnosis
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Diagnosis:', 10, yPos);
    yPos += 11;

    doc.setFont('times', 'normal');
    doc.setFontSize(12);

    if (formData.dischargeDiagnosis.length === 0) {
        // No diagnosis available
        doc.text('N/A', 15, yPos);
        yPos += 7;
    } else if (formData.dischargeDiagnosis.length === 1) {
        // Single diagnosis - just print as paragraph
        const lines = doc.splitTextToSize(formData.dischargeDiagnosis[0], 180);
        lines.forEach((line) => {
            doc.text(line, 15, yPos);
            yPos += 7;
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
        });
    } else {
        // Multiple diagnoses - list with numbers
        formData.dischargeDiagnosis.forEach((diagnosis, index) => {
            const lines = doc.splitTextToSize(`${index + 1}. ${diagnosis}`, 180);
            lines.forEach((line) => {
                doc.text(line, 15, yPos);
                yPos += 7;
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
            });
        });
    }

    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;

    // Hospital Course & Treatment
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Hospital Course & Treatment Administered:', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    formData.hospitalCourse.forEach((course, index) => {
        // Bullet and Treatment Line
        const bullet = '\u2022'; // Unicode bullet
        const indent = 15;

        // Check if there are any non-empty subpoints
        const hasValidSubpoints = course.subpoints.some(subpoint => subpoint.trim() !== '');

        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Black text
        doc.text(`${bullet} ${course.treatment}${hasValidSubpoints ? ':' : ''}`, indent, yPos);
        yPos += 8;

        // Subpoints lines (only if non-empty)
        course.subpoints.forEach((subpoint) => {
            if (subpoint.trim() !== '') { // Only process non-empty subpoints
                const subpointLines = doc.splitTextToSize(subpoint, 180);
                subpointLines.forEach((line) => {
                    doc.setFont('times', 'normal');
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0); // Black text
                    doc.text(`-> ${line}`, indent + 5, yPos); // Arrow prefix as in provided code
                    yPos += 6;

                    // Add page if needed
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }
        });

        yPos += 4; // Extra space after each treatment
    });

    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;




    doc.addPage();
    yPos = 20; // Reset for new page content

    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;


    // Challenges During Treatment
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Challenges During Treatment & Reasons for Prolonged Hospitalization:', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    formData.treatmentChallenges.forEach((challenge, index) => {
        // Numbered Challenge Line
        const indent = 15;

        // Check if there are any non-empty subpoints
        const hasValidSubpoints = challenge.subpoints.some(subpoint => subpoint.trim() !== '');

        doc.setFont('times', 'normal'); // Normal font for challenge
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Black text
        doc.text(`${index + 1}. ${challenge.challenges}${hasValidSubpoints ? ':' : ''}`, indent, yPos);
        yPos += 8;

        // Subpoints lines (only if non-empty)
        challenge.subpoints.forEach((subpoint) => {
            if (subpoint.trim() !== '') { // Only process non-empty subpoints
                const subpointLines = doc.splitTextToSize(subpoint, 180);
                subpointLines.forEach((line) => {
                    doc.setFont('times', 'normal');
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0); // Black text
                    doc.text(`-> ${line}`, indent + 5, yPos); // Arrow prefix as in original code
                    yPos += 6;

                    // Add page if needed
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }
        });

        yPos += 4; // Extra space after each challenge
    });


    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;



    // Condition at Discharge
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Condition at Discharge:', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    formData.conditionAtDischarge.forEach((condition) => {
        // Only process non-empty conditions
        if (condition.trim() !== '') {
            // Bullet Condition Line
            const bullet = '\u2022'; // Unicode bullet
            const indent = 15;

            doc.setFont('times', 'normal'); // Normal font for condition
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Black text
            doc.text(`${bullet} ${condition}`, indent, yPos);
            yPos += 5;

            // Add page if needed
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            yPos += 4; // Extra space after each condition
        }
    });

    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;



    doc.addPage();
    yPos = 20; // Reset for new page content

    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;



    // Discharge Medication
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Discharge Medication:', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    // Debugging: Log the dischargeMedication data
    console.log('Discharge Medication Data:', formData.dischargeMedication);

    if (!formData.dischargeMedication || formData.dischargeMedication.length === 0) {
        // Fallback if no medications
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('No medications recorded.', 15, yPos);
        yPos += 8;
        yPos += 4;
    } else {
        formData.dischargeMedication.forEach((medication, index) => {
            // Debugging: Log each medication entry
            console.log(`Medication ${index + 1}:`, medication);

            // Only process if medication object is valid and has a non-empty name
            if (medication && medication.name && medication.name.trim() !== '') {
                // Numbered Medication Line
                const indent = 15;

                // Medication name (bold)
                doc.setFont('times', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0); // Black text
                const nameText = `${index + 1}.  ${medication.name}`;
                const nameWidth = doc.getTextWidth(nameText);
                doc.text(nameText, indent, yPos);

                // Dosage and duration (normal, only if non-empty)
                if (medication.dosageDuration && medication.dosageDuration.trim() !== '') {
                    doc.setFont('times', 'normal');
                    doc.setFontSize(12);
                    doc.setTextColor(0, 0, 0); // Black text
                    doc.text(` —— ${medication.dosageDuration}`, indent + nameWidth, yPos);
                }

                yPos += 4;

                // Add page if needed
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }

                yPos += 4; // Extra space after each medication
            }
        });

        // Fallback if no valid medications were rendered
        if (!formData.dischargeMedication.some(med => med && med.name && med.name.trim() !== '')) {
            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('No valid medications recorded.', 15, yPos);
            yPos += 8;
            yPos += 4;
        }
    }


    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;


    // Special Instructions
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Special Instruction(s):', 10, yPos);
    yPos += 15;

    doc.setFontSize(12);

    formData.specialInstructions.forEach((instruction) => {
        // Only process non-empty instructions
        if (instruction.trim() !== '') {
            // Bullet Instruction Line
            const bullet = '\u2022'; // Unicode bullet
            const indent = 15;

            doc.setFont('times', 'normal'); // Normal font for instruction
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0); // Black text
            doc.text(`${bullet} ${instruction}`, indent, yPos);
            yPos += 5;

            // Add page if needed
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            yPos += 4; // Extra space after each instruction
        }
    });


    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;




    doc.addPage();
    yPos = 20; // Reset for new page content

    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;





    // Review Date
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.text('Review Date:', 10, yPos);
    yPos += 6;

    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.text(`Follow-up: ${formData.reviewDate}`, 15, yPos);
    yPos += 10;

    // Emergency Contact
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.text('In case any of these symptoms persist, please contact immediately on:', 10, yPos);
    yPos += 6;

    doc.setFont('times', 'normal');
    doc.setFontSize(10);
    doc.text(formData.emergencyContact, 15, yPos);
    yPos += 5;

    formData.emergencySymptoms.forEach((symptom, index) => {
        doc.text(`${index + 1}. ${symptom}`, 15, yPos);
        yPos += 5;
    });





    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;
    



    // Consultant and Medical Officer
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    // doc.text('Consultant and Medical Officer:', 10, yPos);
    yPos += 12;

    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black text

    // // Page width for right alignment (A4 width = ~595 points in jsPDF)
    // const pageWidth = 595;
    // const indent = 15;
    const rightMargin = 16;

    // Consultant (left side)
    const consultantText = 'Consultant';
    doc.text(consultantText, indent, yPos);

    // Medical Officer (right side)
    const medicalOfficerText = 'Medical Officer';
    const medicalOfficerWidth = doc.getTextWidth(medicalOfficerText);
    doc.text(medicalOfficerText, pageWidth - medicalOfficerWidth - rightMargin, yPos);

    yPos += 8;

    // Add page if needed
    if (yPos > 270) {
        doc.addPage();
        yPos = 20;
    }

    yPos += 4; // Extra space after section



// discclaimer
    // Check if there's enough space for the symptoms section (approximate height: ~60 points)
    if (yPos > 200) { // Adjust threshold to ensure section fits at bottom
        doc.addPage();
        yPos = 20;
    }

    // Symptoms Section
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Post-Discharge Instructions:', 10, yPos);
    yPos += 15;

    // Contact Instruction (bold)
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text
    const contactText = 'In case any of these symptoms persist, please contact immediately on: - 0522-2619049/50 or 2231932';
    const contactLines = doc.splitTextToSize(contactText, 180); // Wrap text if too long
    contactLines.forEach((line) => {
        doc.text(line, 15, yPos);
        yPos += 5;
    });

    // Symptoms List (normal font)
    const symptoms = [
        'Fever.',
        'Redness on the site of operation.',
        'Vomiting.',
        'Severe pain at the site of operation.',
        'Any other incurable complication/s.'
    ];

    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text

    symptoms.forEach((symptom, index) => {
        const indent = 15;
        doc.text(`${index + 1}. ${symptom}`, indent, yPos);
        yPos += 5;

        // Add page if needed
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
    });

    yPos += 4; // Extra space after section




    
    const totalPages = doc.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setFont('times', 'normal');

        const pageText = `Page ${i} of ${totalPages}`;
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(pageText);
        const x = (pageWidth - textWidth) / 2; // Centered
        const y = doc.internal.pageSize.getHeight() - 10; // 10 units from bottom

        doc.text(pageText, x, y);
    }






    // // Save the PDF
    // doc.save('discharge-summary.pdf');

    // Return Data URL for preview or save the PDF
    if (isPreview) {
        return doc.output('datauristring');
    } else {
        doc.save('discharge-summary.pdf');
    }
};


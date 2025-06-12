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

    yPos = yPos + 25

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
    // Patient Details Heading
    // doc.setFontSize(16); // Changed from 14 to 16
    // doc.setFont('times', 'bold');
    // doc.text('Patient Details:', 10, yPos);
    // yPos += 7;

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
            font: 'times',
            fontSize: 14, // Changed from 10 to 14 for body text
            textColor: 0
        },
        headStyles: {
            font: 'times',
            fillColor: [0, 0, 0],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 16 // Set to 16 for header
        },
        columnStyles: {
            0: { cellWidth: 60, font: 'times', fontStyle: 'bold', textColor: 0, fontSize: 14 }, // Ensure column 0 is bold and 14
            1: { cellWidth: 'auto', font: 'times', fontStyle: 'normal', fontSize: 14 }, // Ensure column 1 is normal and 14
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
    const textWidthClinicalFindings = doc.getTextWidth('Clinical Findings (On Admission):');
    doc.setLineWidth(0.5);
    doc.line(10, yPos + 2, 10 + textWidthClinicalFindings, yPos + 2); // Add underline
    yPos += 15;

    doc.setFontSize(14);


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
        { label: 'Temperature', value: `${formData.temperature}` },
        { label: 'SpO2', value: `${formData.spO2} ${formData.spO2Method}` }
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




    // Systemic Examination Heading 
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Systemic Examination:', 10, yPos);
    const textWidthSystemicExamination = doc.getTextWidth('Systemic Examination:'); // Corrected typo in variable name
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthSystemicExamination + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 15;

    const systemicFindings = [
        { label: 'Central Nervous System (CNS)', value: formData.cns },
        { label: 'Cardiovascular System (CVS)', value: `${formData.cvs}` },
        { label: 'Respiratory System', value: formData.respiratorySystem },
        { label: 'Per/Abdomen (P/A)', value: formData.perAbdomen },
        { label: 'Bowel Sounds', value: formData.bowelSounds }
    ];

    systemicFindings.forEach(({ label, value }) => {
        doc.setFont('times', 'normal');
        doc.setFontSize(14); // Keep 16 for bullet to maintain visibility
        doc.text(`${bullet} `, indent, yPos);

        doc.setFontSize(14); // Changed from 12 to 14 for main text

        const bulletWidth = doc.getTextWidth(`${bullet} `);
        doc.setFont('times', 'bold');
        doc.text(`${label}: `, indent + bulletWidth, yPos);

        const labelWidth = doc.getTextWidth(`${label}: `);

        if (label === 'Cardiovascular System (CVS)') {
            const xStart = indent + bulletWidth + labelWidth;
            doc.setFontSize(14); // Changed from 12 to 14
            doc.setFont('times', 'normal');
            doc.text(' S', xStart, yPos);
            let s1Width = doc.getTextWidth('S');

            doc.setFontSize(8); // Keep superscript at 8 for readability
            doc.text('  1', xStart + s1Width, yPos + 1);

            const s1TotalWidth = doc.getTextWidth('S1');

            doc.setFontSize(14); // Changed from 12 to 14
            doc.text('  S', xStart + s1TotalWidth + 1, yPos);

            let s2Width = doc.getTextWidth(' S');

            doc.setFontSize(8); // Keep superscript at 8
            doc.text('  2', xStart + s1TotalWidth + 1 + s2Width, yPos + 1);

            doc.setFontSize(14); // Changed from 12 to 14
            doc.text(` ${value}`, xStart + s1TotalWidth + 1 + s2Width + doc.getTextWidth('2 '), yPos);
        } else {
            doc.setFont('times', 'normal');
            doc.setFontSize(14); // Changed from 12 to 14
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




    // Key Blood Investigations Heading 
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Key Blood Investigations (Pathology):', 10, yPos);
    const textWidthKeyBlood = doc.getTextWidth('Key Blood Investigations (Pathology):');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthKeyBlood + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 15;

    doc.setFontSize(14); // Changed from 12 to 14

    formData.bloodInvestigations.forEach((investigation, index) => {
        doc.setFont('times', 'bold');
        doc.setFontSize(14); // Changed from 12 to 14
        if (index === 0) {
            doc.text(`${bullet} ${investigation.date} (On Admission):`, indent, yPos);
        } else {
            doc.text(`${bullet} ${investigation.date}:`, indent, yPos);
        }

        yPos += 8;

        investigation.tests.forEach((test) => {
            const xStart = indent + 5;
            const yStart = yPos;

            doc.setFont('times', 'bold');
            doc.setFontSize(14); // Changed from 12 to 14
            doc.text(`- ${test.name}: `, xStart, yStart);
            const nameWidth = doc.getTextWidth(`- ${test.name}: `);

            let xCurrent = xStart + nameWidth;

            doc.setFont('times', 'normal');
            doc.setFontSize(14); // Changed from 12 to 14
            xCurrent = renderTextWithSuperscript(doc, test.value, xCurrent, yStart);

            doc.text(' ', xCurrent, yStart);
            xCurrent += 1;

            xCurrent = renderTextWithSuperscript(doc, test.unit, xCurrent, yStart);

            yPos += lineHeight + 3;

            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
        });

        yPos += 4;
    });

    function renderTextWithSuperscript(doc, text, x, y) {
        let i = 0;
        let xPos = x;
        doc.setFontSize(14); // Changed from 12 to 14 for normal text

        while (i < text.length) {
            if (text[i] === '^') {
                i++;
                let superText = '';
                while (i < text.length && text[i] !== ' ') {
                    superText += text[i];
                    i++;
                }
                doc.setFontSize(8); // Keep superscript at 8
                doc.text(superText, xPos, y - 1.5);
                xPos += doc.getTextWidth(superText);
                doc.setFontSize(14); // Changed from 10 to 14
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






    // Radiological & Diagnostic Findings Heading (unchanged)
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Radiological & Diagnostic Findings:', 10, yPos);
    const textWidthRadiological = doc.getTextWidth('Radiological & Diagnostic Findings:');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthRadiological + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 15;

    doc.setFontSize(14); // Changed from 12 to 14

    formData.radiologicalFindings.forEach((finding, index) => {
        const bullet = '\u2022';
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - indent - 12;

        const hasValidDescriptions = finding.descriptions.some(desc => desc.trim() !== '');

        doc.setFont('times', 'bold');
        doc.setFontSize(14); // Changed from 12 to 14
        doc.setTextColor(0, 0, 0);
        const findingText = `${bullet} ${finding.name} (${finding.date})${hasValidDescriptions ? ':' : ''}`;
        const findingLines = doc.splitTextToSize(findingText, maxWidth);

        const bulletWidth = doc.getTextWidth(`${bullet} `);
        const textIndent = indent + bulletWidth;

        findingLines.forEach((line, lineIndex) => {
            const xPos = lineIndex === 0 ? indent : textIndent;
            doc.text(line, xPos, yPos);
            yPos += 6;
        });

        finding.descriptions.forEach((desc) => {
            if (desc.trim() !== '') {
                const descIndent = indent + 5;
                const descMaxWidth = pageWidth - descIndent - 12;

                const descText = `- ${desc}`;
                const descLines = doc.splitTextToSize(descText, descMaxWidth);

                const arrowWidth = doc.getTextWidth(`- `);
                const descTextIndent = descIndent + arrowWidth;

                doc.setFont('times', 'normal');
                doc.setFontSize(14); // Changed from 12 to 14
                doc.setTextColor(0, 0, 0);
                descLines.forEach((line, lineIndex) => {
                    const xPos = lineIndex === 0 ? descIndent : descTextIndent;
                    doc.text(line, xPos, yPos);
                    yPos += 6;

                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }
        });

        yPos += 4;
    });


    yPos += 6;
    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;




    // Diagnosis Heading
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Diagnosis:', 10, yPos);
    const textWidthDiagnosis = doc.getTextWidth('Diagnosis:');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthDiagnosis + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 11;

    doc.setFont('times', 'normal');
    doc.setFontSize(14); // Changed from 12 to 14

    if (formData.dischargeDiagnosis.length === 0) {
        doc.text('N/A', 15, yPos);
        yPos += 7;
    } else if (formData.dischargeDiagnosis.length === 1) {
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




    // Hospital Course & Treatment Heading (unchanged)
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Hospital Course & Treatment Administered:', 10, yPos);
    const textWidthHospitalCourse = doc.getTextWidth('Hospital Course & Treatment Administered:');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthHospitalCourse + 1, yPos + 2); // Extend line width by 1 unit
    yPos += 15;

    doc.setFontSize(14); // Changed from 12 to 14

    formData.hospitalCourse.forEach((course, index) => {
        const bullet = '\u2022';
        const indent = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - indent - 12;

        const hasValidSubpoints = course.subpoints.some(subpoint => subpoint.trim() !== '');

        doc.setFont('times', 'bold');
        doc.setFontSize(14); // Changed from 12 to 14
        doc.setTextColor(0, 0, 0);
        const treatmentText = `${bullet} ${course.treatment}${hasValidSubpoints ? ':' : ''}`;
        const treatmentLines = doc.splitTextToSize(treatmentText, maxWidth);

        const bulletWidth = doc.getTextWidth(`${bullet} `);
        const textIndent = indent + bulletWidth;

        treatmentLines.forEach((line, lineIndex) => {
            const xPos = lineIndex === 0 ? indent : textIndent;
            doc.text(line, xPos, yPos);
            yPos += 8;

            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
        });

        course.subpoints.forEach((subpoint) => {
            if (subpoint.trim() !== '') {
                const subpointIndent = indent + 5;
                const subpointMaxWidth = pageWidth - subpointIndent - 12;

                const subpointText = `- ${subpoint}`;
                const subpointLines = doc.splitTextToSize(subpointText, subpointMaxWidth);

                const arrowWidth = doc.getTextWidth(`- `);
                const subpointTextIndent = subpointIndent + arrowWidth;

                doc.setFont('times', 'normal');
                doc.setFontSize(14); // Changed from 12 to 14
                doc.setTextColor(0, 0, 0);
                subpointLines.forEach((line, lineIndex) => {
                    const xPos = lineIndex === 0 ? subpointIndent : subpointTextIndent;
                    doc.text(line, xPos, yPos);
                    yPos += 6;

                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }
        });

        yPos += 4;
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



    
    // Challenges During Treatment Heading
    doc.setFont('times', 'bold'); // Set font to Times, bold for the heading
    doc.setFontSize(16); // Set font size to 16 for the heading
    doc.text('Challenges During Treatment & Reasons for Prolonged Hospitalization:', 10, yPos); // Add heading text
    const textWidthChallenges = doc.getTextWidth('Challenges During Treatment & Reasons for Prolonged Hospitalization:'); // Calculate heading width
    doc.setLineWidth(0.5); // Set line thickness for underline
    doc.line(10, yPos + 2, 10 + textWidthChallenges + 1, yPos + 2); // Draw underline
    yPos += 15; // Space below heading

    doc.setFontSize(14); // Set font size to 14 for points and subpoints

    formData.treatmentChallenges.forEach((challenge, index) => {
        const indent = 15; // Base indentation for challenge points
        const hasValidSubpoints = challenge.subpoints.some(subpoint => subpoint.trim() !== ''); // Check for non-empty subpoints

        // Handle wrapping for the main challenge text
        doc.setFont('times', 'normal'); // Set font to Times, normal
        doc.setFontSize(14); // Ensure font size is 14
        doc.setTextColor(0, 0, 0); // Set text color to black
        const challengeText = `${index + 1}. ${challenge.challenges}${hasValidSubpoints ? ':' : ''}`; // Format challenge text
        const numberPrefix = `${index + 1}. `; // Number prefix (e.g., "1. ")
        const numberPrefixWidth = doc.getTextWidth(numberPrefix); // Width of number prefix for alignment
        const challengeLines = doc.splitTextToSize(challengeText, 180); // Split text to wrap at 180 units

        // Print wrapped challenge lines
        challengeLines.forEach((line, lineIndex) => {
            const lineIndent = lineIndex === 0 ? indent : indent + numberPrefixWidth; // Align wrapped lines under challenge text
            doc.text(line, lineIndent, yPos); // Print the line
            yPos += 6; // Spacing between wrapped challenge lines
            if (yPos > 270) { // Check for page overflow
                doc.addPage();
                yPos = 20;
            }
        });

        // Add space before subpoints only if there are valid subpoints
        if (hasValidSubpoints) {
            yPos += 2; // Space between challenge point and its subpoints
            if (yPos > 270) { // Check for page overflow
                doc.addPage();
                yPos = 20;
            }
        }

        // Handle subpoints
        challenge.subpoints.forEach((subpoint) => {
            if (subpoint.trim() !== '') { // Process non-empty subpoints
                const bulletPrefix = '- '; // Bullet prefix for subpoints
                const bulletPrefixWidth = doc.getTextWidth(bulletPrefix); // Calculate width of bullet prefix
                const subpointLines = doc.splitTextToSize(`- ${subpoint}`, 180); // Split subpoint text to wrap
                subpointLines.forEach((line, lineIndex) => {
                    const subpointIndent = lineIndex === 0 ? indent + 5 : indent + 5 + bulletPrefixWidth; // Align wrapped lines under subpoint text
                    doc.setFont('times', 'normal');
                    doc.setFontSize(14);
                    doc.setTextColor(0, 0, 0);
                    doc.text(line, subpointIndent, yPos); // Print subpoint line
                    yPos += 6; // Spacing between wrapped subpoint lines
                    if (yPos > 270) { // Check for page overflow
                        doc.addPage();
                        yPos = 20;
                    }
                });
            }
        });

        // Space after subpoints (or challenge point if no subpoints) before next challenge
        yPos += 8; // Space between challenges (or after subpoints)
    });

    yPos += 6;

    // Draw a horizontal line
    doc.setDrawColor(0); // black
    doc.setLineWidth(0.1);
    doc.line(10, yPos, 200, yPos); // x1, y1, x2, y2

    // Add extra spacing
    yPos += 15;



    // Condition at Discharge Heading (unchanged)
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Condition at Discharge:', 10, yPos);
    const textWidthCondition = doc.getTextWidth('Condition at Discharge:');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthCondition + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 15;

    doc.setFontSize(14); // Changed from 12 to 14

    formData.conditionAtDischarge.forEach((condition) => {
        if (condition.trim() !== '') {
            const bullet = '\u2022';
            const indent = 15;

            doc.setFont('times', 'normal');
            doc.setFontSize(14); // Changed from 12 to 14
            doc.setTextColor(0, 0, 0);
            doc.text(`${bullet} ${condition}`, indent, yPos);
            yPos += 5;

            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            yPos += 4;
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



    // Discharge Medication Heading (unchanged)
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Discharge Medication:', 10, yPos);
    const textWidthDischargeMed = doc.getTextWidth('Discharge Medication:');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthDischargeMed + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 15;

    doc.setFontSize(14); // Changed from 12 to 14

    if (!formData.dischargeMedication || formData.dischargeMedication.length === 0) {
        doc.setFont('times', 'normal');
        doc.setFontSize(14); // Changed from 12 to 14
        doc.setTextColor(0, 0, 0);
        doc.text('No medications recorded.', 15, yPos);
        yPos += 8;
        yPos += 4;
    } else {
        formData.dischargeMedication.forEach((medication, index) => {
            if (medication && medication.name && medication.name.trim() !== '') {
                const indent = 15;
                const pageWidth = doc.internal.pageSize.getWidth();
                const maxWidth = pageWidth - indent - 12;

                doc.setFont('times', 'bold');
                doc.setFontSize(14); // Changed from 12 to 14
                doc.setTextColor(0, 0, 0);
                const nameText = `${index + 1}.  ${medication.name}  — `;
                const nameWidth = doc.getTextWidth(nameText);
                doc.text(nameText, indent, yPos);

                if (medication.dosageDuration && medication.dosageDuration.trim() !== '') {
                    doc.setFont('times', 'normal');
                    doc.setFontSize(14); // Changed from 12 to 14
                    doc.setTextColor(0, 0, 0);

                    const dosageIndent = indent + nameWidth;
                    const dosageMaxWidth = maxWidth - nameWidth;

                    const dosageText = `${medication.dosageDuration}`;
                    const splitDosage = doc.splitTextToSize(dosageText, dosageMaxWidth);

                    splitDosage.forEach((line, lineIndex) => {
                        doc.text(line, dosageIndent, yPos + (lineIndex * 6));
                    });

                    yPos += splitDosage.length * 6;
                } else {
                    yPos += 4;
                }

                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }

                yPos += 4;
            }
        });

        if (!formData.dischargeMedication.some(med => med && med.name && med.name.trim() !== '')) {
            doc.setFont('times', 'normal');
            doc.setFontSize(14); // Changed from 12 to 14
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


    // Special Instructions Heading (unchanged)
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Special Instruction(s):', 10, yPos);
    const textWidthSpecialInstructions = doc.getTextWidth('Special Instruction(s):');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthSpecialInstructions + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 15;

    doc.setFontSize(14); // Changed from 12 to 14

    formData.specialInstructions.forEach((instruction) => {
        if (instruction.trim() !== '') {
            const bullet = '\u2022';
            const indent = 15;

            doc.setFont('times', 'normal');
            doc.setFontSize(14); // Changed from 12 to 14
            doc.setTextColor(0, 0, 0);
            doc.text(`${bullet} ${instruction}`, indent, yPos);
            yPos += 5;

            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            yPos += 4;
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



    // Review Date Heading (unchanged)
    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.text('Review Date:', 10, yPos);
    const textWidthReviewDate = doc.getTextWidth('Review Date:');
    doc.setLineWidth(0.5); // Increase line thickness for bold underline
    doc.line(10, yPos + 2, 10 + textWidthReviewDate + 0.5, yPos + 2); // Extend line width by 1 unit
    yPos += 12;

    doc.setFont('times', 'normal');
    doc.setFontSize(14); // Changed from 12 to 14

    const reviewDateFields = [
        { label: 'Follow Up', value: formData.reviewDate.followUp || '' },
    ];

    reviewDateFields.forEach((field) => {
        if (field.value.trim() !== '') {
            const bullet = '\u2022';
            const indent = 15;

            doc.setFont('times', 'bold');
            doc.setFontSize(14); // Changed from 12 to 14
            const labelText = `${bullet} ${field.label}: `;
            doc.text(labelText, indent, yPos);

            doc.setFont('times', 'normal');
            doc.setFontSize(14); // Changed from 12 to 14
            const labelWidth = doc.getTextWidth(labelText) + 1;
            doc.text(field.value, indent + labelWidth, yPos);

            yPos += 6;

            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            yPos += 2;
        }
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
    // doc.setFontSize(16);
    // doc.text('Post-Discharge Instructions:', 10, yPos);
    yPos += 120;



    // Contact Instruction (bold)
    doc.setFont('times', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(0, 0, 0); // Black text
    const contactText = 'In case any of these symptoms persist, please contact immediately on: - 0522-2619049/50 or 2231932';
    const contactLines = doc.splitTextToSize(contactText, 180); // Wrap text if too long
    contactLines.forEach((line) => {
        doc.text(line, 15, yPos);
        yPos += 6;
    });

    yPos += 4;

    // Symptoms List (normal font)
    const symptoms = [
        'Fever.',
        'Redness on the site of operation.',
        'Vomiting.',
        'Severe pain at the site of operation.',
        'Any other incurable complication(s).'
    ];

    doc.setFont('times', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black text

    symptoms.forEach((symptom, index) => {
        const indent = 15;
        doc.text(`${index + 1}. ${symptom}`, indent, yPos);
        yPos += 6;

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


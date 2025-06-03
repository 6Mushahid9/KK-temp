export function DischargeMedication({
    formData,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
    handleChange
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
                style={{
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "10px",
                    marginBottom: "20px",
                }}
            >
                Discharge Medication
            </h2>

            {formData.dischargeMedication.map((medication, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: "15px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr auto",
                        gap: "10px",
                    }}
                >
                    <div className="form-group">
                        <label htmlFor={`medication-name-${index}`}>Medication:</label>
                        <input
                            type="text"
                            id={`medication-name-${index}`}
                            value={medication.name}
                            onChange={(e) =>
                                handleArrayChange(
                                    index,
                                    "dischargeMedication",
                                    { ...medication, name: e.target.value },
                                    "dischargeMedication"
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`medication-dosage-${index}`}>Dosage & Duration:</label>
                        <input
                            type="text"
                            id={`medication-dosage-${index}`}
                            value={medication.dosageDuration}
                            onChange={(e) =>
                                handleArrayChange(
                                    index,
                                    "dischargeMedication",
                                    { ...medication, dosageDuration: e.target.value },
                                    "dischargeMedication"
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                            }}
                        />
                    </div>

                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => removeArrayItem("dischargeMedication", index)}
                            style={{
                                background: "#f44336",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                alignSelf: "end",
                                marginBottom: "5px",
                            }}
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={() =>
                    addArrayItem("dischargeMedication", {
                        name: "",
                        dosage: "",
                    })
                }
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
                Add Medication
            </button>
        </div>
    );
  }
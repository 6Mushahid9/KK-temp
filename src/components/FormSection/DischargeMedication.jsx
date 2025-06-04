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
                className="h2"
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
                >

                    <div className="flex gap-5 mt-3">
                    <div className="w-1/4">
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

                    <div className="w-3/4">
                        <label htmlFor={`medication-dosage-${index}`}>Dosage & Duration:</label>
                        <textarea
                            type="text"
                            id={`medication-dosage-${index}`}
                            rows={2}
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
                    </div>


                    {index > 0 && (
                        <div className="flex justify-end">
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
                                // alignSelf: "end",
                                marginTop: "3px",
                            }}
                        >
                            Remove
                        </button>
                        </div>
                    )}
                </div>
            ))}

<div className="mt-3 flex">

            <button
                type="button"
                onClick={() =>
                    addArrayItem("dischargeMedication", {
                        name: "",
                        dosage: "",
                    })
                }
                className="bg-blue-600 text-white px-3 py-2 rounded-sm cursor-pointer"
            >
                Add +
            </button>
</div>

        </div>
    );
  }
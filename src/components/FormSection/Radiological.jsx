export function Radiological({
    formData,
    addArrayItem,
    removeArrayItem,
  }){
    return(
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
                Radiological & Diagnostic Findings
            </h2>

            {formData.radiologicalFindings.map((finding, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: "15px",
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                        }}
                    >
                        <div className="form-group" style={{ width: "60%" }}>
                            <label htmlFor={`finding-date-${index}`}>Date:</label>
                            <input
                                type="text"
                                id={`finding-date-${index}`}
                                value={finding.date}
                                onChange={(e) => {
                                    const updatedFindings = [
                                        ...formData.radiologicalFindings,
                                    ];
                                    updatedFindings[index].date = e.target.value;
                                    setFormData({
                                        ...formData,
                                        radiologicalFindings: updatedFindings,
                                    });
                                }}
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
                                onClick={() =>
                                    removeArrayItem("radiologicalFindings", index)
                                }
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

                    <div className="form-group">
                        <label htmlFor={`finding-description-${index}`}>
                            Description:
                        </label>
                        <textarea
                            id={`finding-description-${index}`}
                            value={finding.description}
                            onChange={(e) => {
                                const updatedFindings = [...formData.radiologicalFindings];
                                updatedFindings[index].description = e.target.value;
                                setFormData({
                                    ...formData,
                                    radiologicalFindings: updatedFindings,
                                });
                            }}
                            style={{
                                width: "100%",
                                padding: "8px",
                                marginTop: "5px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                minHeight: "80px",
                            }}
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() =>
                    addArrayItem("radiologicalFindings", {
                        date: "",
                        description: "",
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
                Add Finding
            </button>
        </div>
    )
}
export function BloodInvestigation({
    formData,
    removeArrayItem,
    addBloodInvestigation,
    addTestToInvestigation,
    removeTestFromInvestigation,
    handleBloodInvestigationChange,
    handleTestChange
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
                Key Blood Investigations (Pathology)
            </h2>

            {formData.bloodInvestigations.map(
                (investigation, investigationIndex) => (
                    <div
                        key={investigationIndex}
                        style={{
                            marginBottom: "20px",
                            padding: "15px",
                            border: "1px solid #eee",
                            borderRadius: "4px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <div className="form-group" style={{ width: "60%" }}>
                                <label htmlFor={`investigation-date-${investigationIndex}`}>
                                    Date:
                                </label>
                                <input
                                    type="text"
                                    id={`investigation-date-${investigationIndex}`}
                                    value={investigation.date}
                                    onChange={(e) =>
                                        handleBloodInvestigationChange(
                                            investigationIndex,
                                            "date",
                                            e.target.value
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

                            {investigationIndex > 0 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeArrayItem(
                                            "bloodInvestigations",
                                            investigationIndex
                                        )
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
                                    Remove Date
                                </button>
                            )}
                        </div>

                        {investigation.tests.map((test, testIndex) => (
                            <div
                                key={testIndex}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "2fr 1fr 1fr auto",
                                    gap: "10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <div className="form-group">
                                    <label
                                        htmlFor={`test-name-${investigationIndex}-${testIndex}`}
                                    >
                                        Test Name:
                                    </label>
                                    <input
                                        type="text"
                                        id={`test-name-${investigationIndex}-${testIndex}`}
                                        value={test.name}
                                        onChange={(e) =>
                                            handleTestChange(
                                                investigationIndex,
                                                testIndex,
                                                "name",
                                                e.target.value
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
                                    <label
                                        htmlFor={`test-value-${investigationIndex}-${testIndex}`}
                                    >
                                        Value:
                                    </label>
                                    <input
                                        type="text"
                                        id={`test-value-${investigationIndex}-${testIndex}`}
                                        value={test.value}
                                        onChange={(e) =>
                                            handleTestChange(
                                                investigationIndex,
                                                testIndex,
                                                "value",
                                                e.target.value
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
                                    <label
                                        htmlFor={`test-unit-${investigationIndex}-${testIndex}`}
                                    >
                                        Unit:
                                    </label>
                                    <input
                                        type="text"
                                        id={`test-unit-${investigationIndex}-${testIndex}`}
                                        value={test.unit}
                                        onChange={(e) =>
                                            handleTestChange(
                                                investigationIndex,
                                                testIndex,
                                                "unit",
                                                e.target.value
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

                                {testIndex > 0 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTestFromInvestigation(
                                                investigationIndex,
                                                testIndex
                                            )
                                        }
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
                            onClick={() => addTestToInvestigation(investigationIndex)}
                            style={{
                                background: "#4CAF50",
                                color: "white",
                                border: "none",
                                padding: "8px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                marginTop: "10px",
                            }}
                        >
                            Add Test
                        </button>
                    </div>
                )
            )}

            <button
                type="button"
                onClick={addBloodInvestigation}
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
                Add Investigation Date
            </button>
        </div>
    )
}
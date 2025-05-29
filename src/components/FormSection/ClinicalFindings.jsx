export function ClinicalFindings({ handleChange, formData, handleArrayChange, addArrayItem, removeArrayItem }) {
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
                Clinical Findings (On Admission)
            </h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                }}
            >
                <div className="form-group border border-none rounded-md shadow-md mb-2 px-3 bg-blue-200">
                    <label htmlFor="generalCondition">General Condition (GC):</label>
                    <input
                        type="text"
                        id="generalCondition"
                        name="generalCondition"
                        value={formData.generalCondition}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                        }}
                    />
                </div>

                <div className="form-group border rounded-xl shadow-md mb-2">
                    <label htmlFor="pallor">Pallor:</label>
                    <div className="flex justify-evenly" style={{ marginTop: "5px" }}>
                        <label style={{ marginRight: "15px" }}>
                            <input
                                type="radio"
                                id="pallor-present"
                                name="pallor"
                                value="Present"
                                checked={formData.pallor === "Present"}
                                onChange={handleChange}
                                style={{ marginRight: "5px" }}
                            />
                            Present
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="pallor-not-present"
                                name="pallor"
                                value="Not Present"
                                checked={formData.pallor === "Not Present"}
                                onChange={handleChange}
                                style={{ marginRight: "5px" }}
                            />
                            Not Present
                        </label>
                    </div>
                </div>

                <div className="form-group border rounded-xl shadow-md mb-2">
                    <label htmlFor="icterus">Icterus:</label>
                    <div className="flex justify-evenly" style={{ marginTop: "5px" }}>
                        <label style={{ marginRight: "15px" }}>
                            <input
                                type="radio"
                                id="icterus-present"
                                name="icterus"
                                value="Present"
                                checked={formData.icterus === "Present"}
                                onChange={handleChange}
                                style={{ marginRight: "5px" }}
                            />
                            Present
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="icterus-not-present"
                                name="icterus"
                                value="Not Present"
                                checked={formData.icterus === "Not Present"}
                                onChange={handleChange}
                                style={{ marginRight: "5px" }}
                            />
                            Not Present
                        </label>
                    </div>
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                    <label htmlFor="bloodPressure">Blood Pressure:</label>
                    <input
                        type="text"
                        id="bloodPressure"
                        name="bloodPressure"
                        value={formData.bloodPressure}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px 50px 8px 8px", // space for unit on the right
                            marginTop: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            boxSizing: "border-box",
                        }}
                    />
                    <span
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "53px",
                            transform: "translateY(-50%)",
                            color: "#555",
                            pointerEvents: "none", // allow clicks to go through
                        }}
                    >
                        mmHg
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="pulseRate">Pulse Rate:</label>
                    <input
                        type="text"
                        id="pulseRate"
                        name="pulseRate"
                        value={formData.pulseRate}
                        onChange={handleChange}
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
                    <label htmlFor="respiratoryRate">Respiratory Rate:</label>
                    <input
                        type="text"
                        id="respiratoryRate"
                        name="respiratoryRate"
                        value={formData.respiratoryRate}
                        onChange={handleChange}
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
                    <label htmlFor="temperature">Temperature:</label>
                    <input
                        type="text"
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
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
                    <label htmlFor="spO2">SpO2:</label>
                    <input
                        type="text"
                        id="spO2"
                        name="spO2"
                        value={formData.spO2}
                        onChange={handleChange}
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
        </div>

    )
}
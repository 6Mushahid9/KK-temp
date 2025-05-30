export function SystemicExamination({
    handleChange,
    formData,
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
                Systemic Examination
            </h2>

            <div
                style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}
            >
                <div className="form-group">
                    <label htmlFor="cns">Central Nervous System (CNS):</label>
                    <textarea
                        id="cns"
                        name="cns"
                        value={formData.cns}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                            minHeight: "60px",
                        }}
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
                    <label htmlFor="respiratorySystem">Respiratory System:</label>
                    <input
                        type="text"
                        id="respiratorySystem"
                        name="respiratorySystem"
                        value={formData.respiratorySystem}
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
                    <label htmlFor="perAbdomen">Per/Abdomen (P/A):</label>
                    <input
                        type="text"
                        id="perAbdomen"
                        name="perAbdomen"
                        value={formData.perAbdomen}
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
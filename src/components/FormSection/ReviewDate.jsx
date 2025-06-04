export function ReviewDate() {
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
                Review Date
            </h2>

            <div className="form-group">
                <label htmlFor="reviewDate">Follow-up:</label>
                <input
                    type="text"
                    id="reviewDate"
                    name="reviewDate"
                    value={formData.reviewDate}
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
    )
}
export function HospitalCourse({ formData, handleChange }) {
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
            {/* Hospital Course & Treatment Section */}
            <h2
                style={{
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "10px",
                    marginBottom: "20px",
                }}
            >
                Hospital Course & Treatment Administered
            </h2>

            <div className="form-group">
                <textarea
                    id="hospitalCourse"
                    name="hospitalCourse"
                    value={formData.hospitalCourse}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        minHeight: "120px",
                    }}
                />
            </div>
        </div>
    );
  }
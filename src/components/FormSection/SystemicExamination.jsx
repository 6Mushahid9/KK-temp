export function SystemicExamination({ handleChange, formData }) {
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
        className="h2 "
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Systemic Examination
      </h2>

        {/* row 1 */}
        <div className="mt-3">
          <label htmlFor="cns">Central Nervous System (CNS):</label>
          <input
            id="cns"
            name="cns"
            value={formData.cns}
            onChange={handleChange}
            className=""
          />
        </div>

        {/* row 2 */}
        <div className="mt-3">
          <label htmlFor="cvs">Cardiovascular System (CVS):</label>
          <input
            type="text"
            id="cvs"
            name="cvs"
            value={formData.cvs}
            onChange={handleChange}
          />
        </div>

        {/* row 3 */}
        <div className="mt-3">
          <label htmlFor="respiratorySystem">Respiratory System:</label>
          <input
            type="text"
            id="respiratorySystem"
            name="respiratorySystem"
            value={formData.respiratorySystem}
            onChange={handleChange}
          />
        </div>

        {/* row 4 */}
        <div className="grid grid-col-12 gap-3 mt-3">
          <div className="col-span-6">
            <label htmlFor="perAbdomen">Per/Abdomen (P/A):</label>
            <input
              type="text"
              id="perAbdomen"
              name="perAbdomen"
              value={formData.perAbdomen}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-6">
            <label htmlFor="perAbdomen">Bowel Sounds:</label>
            <input
              type="text"
              id="perAbdomen"
              name="perAbdomen"
              value={formData.perAbdomen}
              onChange={handleChange}
            />
          </div>
        </div>
    </div>
  );
}

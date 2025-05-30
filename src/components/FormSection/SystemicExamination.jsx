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
      <div className="mt-3 grid grid-cols-12 gap-4 items-center">
  {/* Left Column: S1S2 Radio Buttons */}
  <div className="col-span-6">
    <label
      htmlFor="s1s2"
      className="block mb-1 font-medium text-gray-700"
    >
      S1S2:
    </label>
    <div className="flex justify-evenly rounded-sm h-12 mt-2 bg-white">
      <label className="!flex !items-center whitespace-nowrap gap-2">
        <input
          type="radio"
          id="s1s2-present"
          name="s1s2"
          value="Present"
          checked={formData.s1s2 === "Present"}
          onChange={handleChange}
        />
        <span>Present</span>
      </label>
      <label className="!flex !items-center whitespace-nowrap gap-2">
        <input
          type="radio"
          id="s1s2-absent"
          name="s1s2"
          value="Absent"
          checked={formData.s1s2 === "Absent"}
          onChange={handleChange}
        />
        <span>Absent</span>
      </label>
    </div>
  </div>

  {/* Right Column: Additional CVS Info Input */}
  <div className="col-span-6">
    <label htmlFor="cvs" className="block mb-1 font-medium text-gray-700">
      Cardiovascular System (CVS):
    </label>
    <input
      type="text"
      id="cvs"
      name="cvs"
      value={formData.cvs}
      onChange={handleChange}
      className="w-full p-2 mt-2 border border-gray-300 rounded"
    />
  </div>
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
      <div className="grid grid-cols-12 gap-3 mt-3">
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
          <label
            htmlFor="bowel-sounds-present"
          >
            Bowel Sounds:
          </label>
          <div className="flex justify-evenly rounded-sm h-12 bg-white">
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="bowel-sounds-present"
                name="bowelSounds"
                value="Present"
                checked={formData.bowelSounds === "Present"}
                onChange={handleChange}
              />
              <span>Present</span>
            </label>
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="bowel-sounds-absent"
                name="bowelSounds"
                value="Absent"
                checked={formData.bowelSounds === "Absent"}
                onChange={handleChange}
              />
              <span>Absent</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

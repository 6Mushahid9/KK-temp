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
        className="h2"
        style={{
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Systemic Examination
      </h2>

      <div className="grid grid-cols-12 gap-3.5">
        {/* row 1 */}
        <div className="form-group col-span-12 mt-3">
          <label htmlFor="cns" className="block mb-1 font-medium text-gray-700">
            Central Nervous System (CNS):
          </label>
          <input
            id="cns"
            name="cns"
            value={formData.cns}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* row 2 */}
        <div className="form-group col-span-6 mt-3">
          <label
            htmlFor="cvs"
            className="block mb-1 font-medium text-gray-700"
          >
            Cardiovascular System (CVS):
          </label>
          <div className="flex justify-evenly rounded-sm h-13.5 bg-white">
            <span className="font-medium mt-2.5">S<sub>1</sub>S<sub>2</sub></span>
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="cvs-heard"
                name="cvs"
                value="heard"
                checked={formData.cvs === "heard"}
                onChange={handleChange}
              />
              <span>Heard</span>
            </label>
            <label className="!flex !items-center whitespace-nowrap gap-2">
              <input
                type="radio"
                id="cvs-not-heard"
                name="cvs"
                value="not heard"
                checked={formData.cvs === "not heard"}
                onChange={handleChange}
              />
              <span>Not Heard</span>
            </label>
          </div>
        </div>

        <div className="form-group col-span-6 mt-3">
          <label
            htmlFor="respiratorySystem"
            className="block mb-1 font-medium text-gray-700"
          >
            Respiratory System:
          </label>
          <input
            type="text"
            id="respiratorySystem"
            name="respiratorySystem"
            value={formData.respiratorySystem}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* row 3 */}
        <div className="form-group col-span-6 mt-3">
          <label
            htmlFor="perAbdomen"
            className="block mb-1 font-medium text-gray-700"
          >
            Per/Abdomen (P/A):
          </label>
          <input
            type="text"
            id="perAbdomen"
            name="perAbdomen"
            value={formData.perAbdomen}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="form-group col-span-6 mt-3">
          <label
            htmlFor="bowel-sounds-present"
            className="block mb-1 font-medium text-gray-700"
          >
            Bowel Sounds:
          </label>
          <div className="flex justify-evenly rounded-sm h-13.5 bg-white">
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
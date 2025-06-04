export function ReviewDate({ formData, setFormData }) {
  function handleChange(e) {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

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
        Review Date
      </h2>

      <div className="form-group w-full">
        <label
          htmlFor="followupDate"
          className="block font-medium text-gray-700"
        >
          Follow Up
        </label>
        <input
          type="text"
          id="followupDate"
          name="reviewDate.followUp"
          value={formData.reviewDate.followUp}
          onChange={handleChange}
          placeholder="Enter date or note"
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
          className="mt-2"
        />
      </div>
    </div>
  );
}

export function ReviewDate({ formData, setFormData }) {
  function handleChange(e) {
  const { name, value } = e.target;

  if (name === "reviewDate.NA") {
    // Handle radio toggle
    const isNASelected = value === "NA";
    setFormData((prev) => ({
      ...prev,
      reviewDate: {
        ...prev.reviewDate,
        NA: isNASelected ? "NA" : "",
        followUp: isNASelected ? "---" : "", // set followUp accordingly
      },
    }));
  } else if (name.includes(".")) {
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

      <div className="flex gap-4 w-full">
        {/* Radio Buttons Row */}
        <div className="flex justify-evenly items-center rounded-sm h-12 bg-white border border-gray-200 w-1/2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="followup-required"
              name="reviewDate.NA"
              value=""
              checked={formData.reviewDate.NA === ""}
              onChange={handleChange}
            />
            <span>Follow Up</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="followup-not-required"
              name="reviewDate.NA"
              value="NA"
              checked={formData.reviewDate.NA === "NA"}
              onChange={handleChange}
            />
            <span>N/A</span>
          </label>
        </div>

        {/* Date Input */}
        <div className="form-group w-1/2">
          <input
            type="text"
            id="followupDate"
            name="reviewDate.followUp"
            value={formData.reviewDate.followUp}
            onChange={handleChange}
            onFocus={(e) => {
              if (e.target.value === "---") e.target.value = "";
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
      </div>
    </div>
  );
}

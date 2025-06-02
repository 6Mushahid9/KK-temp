export function ConditionAtDischarge({
    formData,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
}) {
    return (
        <div className="form-section mt-3 border-2 border-gray-300 rounded-md p-4">
            <h2 className="text-left font-semibold">Condition at Discharge</h2>

            {formData.conditionAtDischarge.map((item, index) => (
                <div key={index} className="form-section"
                    style={{
                        marginBottom: "30px",
                        border: "1px solid #ddd",
                        padding: "20px",
                        borderRadius: "5px",
                }}>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                            handleArrayChange(
                                index,
                                "conditionAtDischarge",
                                e.target.value,
                                "conditionAtDischarge"
                            )
                        }
                        placeholder={`Condition at Discharge ${index + 1}`}
                        className="flex-1 border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => removeArrayItem("conditionAtDischarge", index)}
                            className="bg-red-500 text-white px-4 py-2.5 cursor-pointer rounded-sm"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}

            <div className="flex flex-initial">
                <button
                    type="button"
                    onClick={() => addArrayItem("conditionAtDischarge", "")}
                    className="bg-blue-600 text-white px-3 py-2 rounded-sm cursor-pointer mt-2.5"
                >
                    Add +
                </button>
            </div>
        </div>
    );
  }
export function SpecialInstructions({
    formData,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
}) {
    return (
        <div className="form-section mt-3 border-2 border-gray-300 rounded-md p-4">
            <h2 className="text-left font-semibold">Special Instruction/s</h2>

            {formData.specialInstructions.map((item, index) => (
                <div
                    key={index}
                    className="form-section"
                    style={{
                        marginBottom: "30px",
                        border: "1px solid #ddd",
                        padding: "20px",
                        borderRadius: "5px",
                    }}
                >
                    <textarea
                        value={item}
                        onChange={(e) =>
                            handleArrayChange(
                                index,
                                "specialInstructions",
                                e.target.value,
                                "specialInstructions"
                            )
                        }
                        placeholder={`Special Instruction ${index + 1}`}
                        className="flex-1 border border-gray-300 px-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                            width: "100%",
                            minHeight: "80px",
                        }}
                    />

                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => removeArrayItem("specialInstructions", index)}
                            className="bg-red-500 text-white px-4 py-2.5 cursor-pointer rounded-sm mt-2"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}

            <div className="flex flex-initial">
                <button
                    type="button"
                    onClick={() => addArrayItem("specialInstructions", "")}
                    className="bg-blue-600 text-white px-3 py-2 rounded-sm cursor-pointer mt-2.5"
                >
                    Add +
                </button>
            </div>
        </div>
    );
}
export function SpecialInstructions({
    formData,
    handleArrayChange,
    addArrayItem,
    removeArrayItem,
}) {
    return (
        <div className="form-section mt-3 border-2 border-gray-300 rounded-md p-4">
            <h2 className="h2"
                style={{
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "10px",
                    marginBottom: "20px",
                }}>Special Instruction(s)</h2>

            {formData.specialInstructions.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-4"
                    
                >
                    <input
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
                        className="mt-3"
                        
                    />

                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => removeArrayItem("specialInstructions", index)}
                            className="bg-red-500 text-white cursor-pointer rounded-sm h-12 mt-3 px-3"
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
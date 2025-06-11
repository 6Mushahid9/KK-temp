export function Challenges({
    formData,
    setFormData,
}) {
    const addChallenge = (formData, setFormData) => {
        setFormData({
            ...formData,
            treatmentChallenges: [
                ...formData.treatmentChallenges,
                { challenges: "", subpoints: [""] },
            ],
        });
    };

    const removeChallenge = (formData, setFormData, index) => {
        const updatedChallenges = [...formData.treatmentChallenges];
        updatedChallenges.splice(index, 1);
        setFormData({
            ...formData,
            treatmentChallenges: updatedChallenges,
        });
    };

    const handleChallengeChange = (formData, setFormData, index, field, value) => {
        const updatedChallenges = [...formData.treatmentChallenges];
        updatedChallenges[index][field] = value;
        setFormData({
            ...formData,
            treatmentChallenges: updatedChallenges,
        });
    };

    const handleSubpointChange = (formData, setFormData, index, subpointIndex, value) => {
        const updatedChallenges = [...formData.treatmentChallenges];
        updatedChallenges[index].subpoints[subpointIndex] = value;
        setFormData({
            ...formData,
            treatmentChallenges: updatedChallenges,
        });
    };

    const addSubpoint = (formData, setFormData, index) => {
        const updatedChallenges = [...formData.treatmentChallenges];
        updatedChallenges[index].subpoints.push("");
        setFormData({
            ...formData,
            treatmentChallenges: updatedChallenges,
        });
    };

    const removeSubpoint = (formData, setFormData, index, subpointIndex) => {
        const updatedChallenges = [...formData.treatmentChallenges];
        updatedChallenges[index].subpoints.splice(subpointIndex, 1);
        setFormData({
            ...formData,
            treatmentChallenges: updatedChallenges,
        });
    };

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
                Challenges During Treatment
            </h2>

            {formData.treatmentChallenges.map((challenge, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-md p-10 mb-5 "
                >
                    <div className="flex justify-between items-center mb-3">
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeChallenge(formData, setFormData, index)}
                                className="bg-red-500 text-white border-none px-3 py-1.5 rounded-md cursor-pointer hover:bg-red-600"
                            >
                                Remove Section
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-12 gap-3.5">
                        <div className="form-group col-span-12">
                            <label
                                htmlFor={`challenge-${index}`}
                                className="block mb-1 font-medium text-gray-700"
                            >
                                Challenge:
                            </label>
                            <input
                                type="text"
                                id={`challenge-${index}`}
                                value={challenge.challenges}
                                onChange={(e) =>
                                    handleChallengeChange(formData, setFormData, index, "challenges", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {challenge.subpoints.map((sub, subpointIndex) => (
                            <div
                                key={subpointIndex}
                                className="col-span-12 grid grid-cols-12 gap-3.5 mb-3"
                            >
                                <div className="form-group col-span-11">
                                    <label
                                        htmlFor={`subpoint-${index}-${subpointIndex}`}
                                        className="block mb-1 font-medium text-gray-700"
                                    >
                                        Subpoint:
                                    </label>
                                    <input
                                        type="text"
                                        id={`subpoint-${index}-${subpointIndex}`}
                                        value={sub}
                                        onChange={(e) =>
                                            handleSubpointChange(formData, setFormData, index, subpointIndex, e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {subpointIndex > 0 && (
                                    <div className="form-group col-span-1 flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => removeSubpoint(formData, setFormData, index, subpointIndex)}
                                            className="bg-red-500 text-white border-none px-3 py-1.5 rounded-md cursor-pointer hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => addSubpoint(formData, setFormData, index)}
                        className="text-white border-none px-4 py-2 rounded-md cursor-pointer mt-3 bg-[#4c9e92] hover:bg-[#5fc1b2] transition-colors duration-300"
                    >
                        Add Subpoint
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() => addChallenge(formData, setFormData)}
                className="bg-blue-500 text-white border-none px-4 py-2 rounded-md cursor-pointer mt-3 hover:bg-blue-600"
            >
                Add Challenge
            </button>
        </div>
    );
}
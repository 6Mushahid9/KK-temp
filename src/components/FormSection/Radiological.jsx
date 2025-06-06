export function Radiological({
    formData,
    setFormData,
    // addRadiologicalFinding,
    // removeRadiologicalFinding,
    // handleRadiologicalFindingChange,
    // handleDescriptionChange,
    // addDescription,
    // removeDescription,
}) {

    const addRadiologicalFinding = (formData, setFormData) => {
        setFormData({
            ...formData,
            radiologicalFindings: [
                ...formData.radiologicalFindings,
                { name: "", date: "", descriptions: [""] },
            ],
        });
    };

    const removeRadiologicalFinding = (formData, setFormData, index) => {
        const updatedFindings = [...formData.radiologicalFindings];
        updatedFindings.splice(index, 1);
        setFormData({
            ...formData,
            radiologicalFindings: updatedFindings,
        });
    };

    const handleRadiologicalFindingChange = (
        formData,
        setFormData,
        index,
        field,
        value
    ) => {
        const updatedFindings = [...formData.radiologicalFindings];
        updatedFindings[index][field] = value;
        setFormData({
            ...formData,
            radiologicalFindings: updatedFindings,
        });
    };

    const handleDescriptionChange = (
        formData,
        setFormData,
        index,
        descIndex,
        value
    ) => {
        const updatedFindings = [...formData.radiologicalFindings];
        updatedFindings[index].descriptions[descIndex] = value;
        setFormData({
            ...formData,
            radiologicalFindings: updatedFindings,
        });
    };

    const addDescription = (formData, setFormData, index) => {
        const updatedFindings = [...formData.radiologicalFindings];
        updatedFindings[index].descriptions.push("");
        setFormData({
            ...formData,
            radiologicalFindings: updatedFindings,
        });
    };

    const removeDescription = (formData, setFormData, index, descIndex) => {
        const updatedFindings = [...formData.radiologicalFindings];
        updatedFindings[index].descriptions.splice(descIndex, 1);
        setFormData({
            ...formData,
            radiologicalFindings: updatedFindings,
        });
    };


    return (
        <div
            className="form-section w-full"
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
                Radiological & Diagnostic Findings
            </h2>

            {formData.radiologicalFindings.map((finding, index) => (
                <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-5 pr-8"
                >
                    <div className="flex justify-between items-center mb-3">
                        <div className="form-group w-[30%]">
                            <label
                                htmlFor={`finding-date-${index}`}
                                className="block mb-1 font-medium text-gray-700"
                            >
                                Date:
                            </label>
                            <input
                                type="date"
                                id={`finding-date-${index}`}
                                value={finding.date}
                                onChange={(e) =>
                                    handleRadiologicalFindingChange(formData, setFormData, index, "date", e.target.value)
                                }
                                className=" bg-green-500 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeRadiologicalFinding(formData, setFormData, index)}
                                className="bg-red-500 text-white border-none px-3 py-1.5 rounded-md cursor-pointer hover:bg-red-600"
                            >
                                Remove Date
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-12 gap-3.5">
                        <div className="form-group col-span-12">
                            <label
                                htmlFor={`finding-name-${index}`}
                                className="block my-3 font-medium text-gray-700"
                            >
                                Radiological / Diagnostic Test & its Findings:
                            </label>
                            <input
                                type="text"
                                id={`finding-name-${index}`}
                                value={finding.name}
                                onChange={(e) =>
                                    handleRadiologicalFindingChange(formData, setFormData, index, "name", e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {finding.descriptions.map((desc, descIndex) => (
                            <div
                                key={descIndex}
                                className="col-span-12 grid grid-cols-12 gap-3.5 mb-3"
                            >
                                <div className="form-group col-span-11">
                                    <label
                                        htmlFor={`description-${index}-${descIndex}`}
                                        className="block mb-1 font-medium text-gray-700"
                                    >
                                        Description:
                                    </label>
                                    <input
                                        type="text"
                                        id={`description-${index}-${descIndex}`}
                                        value={desc}
                                        onChange={(e) =>
                                            handleDescriptionChange(formData, setFormData, index, descIndex, e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {descIndex > 0 && (
                                    <div className="form-group col-span-1 flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => removeDescription(formData, setFormData, index, descIndex)}
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
                        onClick={() => addDescription(formData, setFormData, index)}
                        className="bg-green-500 text-white border-none px-4 py-2 rounded-md cursor-pointer mt-3 hover:bg-green-600"
                    >
                        Add Description
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() => addRadiologicalFinding(formData, setFormData)}
                className="bg-blue-500 text-white border-none px-4 py-2 rounded-md cursor-pointer mt-3 hover:bg-blue-600"
            >
                Add Finding
            </button>
        </div>
    );
}
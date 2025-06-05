export function BloodInvestigation({
    formData,
    removeArrayItem,
    // addBloodInvestigation,
    // addTestToInvestigation,
    // removeTestFromInvestigation,
    // handleBloodInvestigationChange,
    // handleTestChange,
    setFormData
}) {

    const addBloodInvestigation = () => {
        setFormData({
            ...formData,
            bloodInvestigations: [
                ...formData.bloodInvestigations,
                { date: "", tests: [{ name: "", value: "", unit: "" }] },
            ],
        });
    };

    const addTestToInvestigation = (investigationIndex) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex].tests.push({
            name: "",
            value: "",
            unit: "",
        });
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations,
        });
    };

    const removeTestFromInvestigation = (investigationIndex, testIndex) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex].tests.splice(testIndex, 1);
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations,
        });
    };

    const handleBloodInvestigationChange = (investigationIndex, field, value) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex][field] = value;
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations,
        });
    };


    const handleTestChange = (investigationIndex, testIndex, field, value) => {
        const updatedInvestigations = [...formData.bloodInvestigations];
        updatedInvestigations[investigationIndex].tests[testIndex][field] = value;
        setFormData({
            ...formData,
            bloodInvestigations: updatedInvestigations,
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
                Key Blood Investigations (Pathology)
            </h2>

            {formData.bloodInvestigations.map((investigation, investigationIndex) => (
                <div
                    key={investigationIndex}
                    className="border border-gray-200 rounded-md p-4 mb-5 pr-8"
                >
                    <div className="flex justify-between items-center mb-3">
                        <div className="w-3/5">
                            <label
                                htmlFor={`investigation-date-${investigationIndex}`}
                                className="block mb-1 font-medium text-gray-700 col-span-1"
                            >
                                Date:
                            </label>
                            <div className="grid grid-cols-2">

                                <input
                                    type="date"
                                    id={`investigation-date-${investigationIndex}`}
                                    value={investigation.date}
                                    onChange={(e) =>
                                        handleBloodInvestigationChange(
                                            investigationIndex,
                                            "date",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {investigationIndex == 0 && (

                                    <p className="font-bold col-span-1 text-2xl">(On Admission)</p>
                                )}
                            </div>

                        </div>

                        {investigationIndex > 0 && (
                            <button
                                type="button"
                                onClick={() =>
                                    removeArrayItem("bloodInvestigations", investigationIndex)
                                }
                                className="bg-red-500 text-white border-none px-3 py-1.5 rounded-md cursor-pointer hover:bg-red-600"
                            >
                                Remove Date
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-12 gap-3.5">
                        {investigation.tests.map((test, testIndex) => (
                            <div
                                key={testIndex}
                                className="col-span-12 grid grid-cols-12 gap-3.5 mb-3"
                            >
                                <div className="form-group col-span-5">
                                    <label
                                        htmlFor={`test-name-${investigationIndex}-${testIndex}`}
                                        className="block mb-1 font-medium text-gray-700"
                                    >
                                        Test Name:
                                    </label>
                                    <input
                                        type="text"
                                        id={`test-name-${investigationIndex}-${testIndex}`}
                                        value={test.name}
                                        onChange={(e) =>
                                            handleTestChange(
                                                investigationIndex,
                                                testIndex,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="form-group col-span-3">
                                    <label
                                        htmlFor={`test-value-${investigationIndex}-${testIndex}`}
                                        className="block mb-1 font-medium text-gray-700"
                                    >
                                        Value:
                                    </label>
                                    <input
                                        type="text"
                                        id={`test-value-${investigationIndex}-${testIndex}`}
                                        value={test.value}
                                        onChange={(e) =>
                                            handleTestChange(
                                                investigationIndex,
                                                testIndex,
                                                "value",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="form-group col-span-3">
                                    <label
                                        htmlFor={`test-unit-${investigationIndex}-${testIndex}`}
                                        className="block mb-1 font-medium text-gray-700"
                                    >
                                        Unit:
                                    </label>
                                    <input
                                        type="text"
                                        id={`test-unit-${investigationIndex}-${testIndex}`}
                                        value={test.unit}
                                        onChange={(e) =>
                                            handleTestChange(
                                                investigationIndex,
                                                testIndex,
                                                "unit",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {testIndex > 0 && (
                                    <div className="form-group col-span-1 flex items-end">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeTestFromInvestigation(investigationIndex, testIndex)
                                            }
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
                        onClick={() => addTestToInvestigation(investigationIndex)}
                        className="bg-green-500 text-white border-none px-4 py-2 rounded-md cursor-pointer mt-3 hover:bg-green-600"
                    >
                        Add Test
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addBloodInvestigation}
                className="bg-blue-500 text-white border-none px-4 py-2 rounded-md cursor-pointer mt-3 hover:bg-blue-600"
            >
                Add Investigation Date
            </button>
        </div>
    );
}
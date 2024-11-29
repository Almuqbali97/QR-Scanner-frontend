import React from 'react';

const RegistrationFormFields = ({ formData, setFormData, handleSubmit }) => {
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : parseInt(value)) : value,
        }));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="space-y-4"
        >
            <div>
                <label className="block text-gray-700 font-semibold mb-1">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-1">
                    Mobile Number
                </label>
                <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="isGroup"
                    checked={formData.isGroup}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            isGroup: e.target.checked,
                            groupSize: e.target.checked ? prev.groupSize : 1,
                        }))
                    }
                    className="mr-2"
                />
                <label className="text-gray-700 font-semibold">Group Registration</label>
            </div>

            {formData.isGroup && (
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Group Size
                    </label>
                    <input
                        type="number"
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 appearance-none"
                        min="1"
                    />
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationFormFields;

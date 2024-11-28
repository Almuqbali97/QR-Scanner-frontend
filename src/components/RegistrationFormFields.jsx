import React from 'react';

const RegistrationFormFields = ({ formData, setFormData, handleSubmit }) => {
    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                    type="number"
                    placeholder="Enter your mobile number"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            mobileNumber: e.target.value.replace(/\D/, ''), // Allow only numbers
                        })
                    }
                    className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={formData.isGroup}
                        onChange={(e) => setFormData({ ...formData, isGroup: e.target.checked, groupSize: 1 })}
                        className="focus:ring focus:ring-blue-300"
                    />
                    <span>Register as a group</span>
                </label>
                {formData.isGroup && (
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                        <input
                            type="number"
                            placeholder="Enter group size"
                            value={formData.groupSize}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    groupSize: parseInt(e.target.value, 10) || 1,
                                })
                            }
                            className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-blue-300"
                            min="1"
                        />
                    </div>
                )}
            </div>

            <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
                Submit Registration
            </button>
        </div>
    );
};

export default RegistrationFormFields;

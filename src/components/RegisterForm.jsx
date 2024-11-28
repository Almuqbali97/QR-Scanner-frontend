import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        groupSize: 1,
    });

    const handleSubmit = async () => {
        const { firstName, lastName, mobileNumber, groupSize } = formData;

        if (!firstName || !lastName || !mobileNumber) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/register", {
                firstName,
                lastName,
                mobileNumber,
                groupSize,
            });
            alert('Registration successful!');
            setFormData({ firstName: '', lastName: '', mobileNumber: '', groupSize: 1 });
        } catch (err) {
            alert(err.response?.data?.message || 'Error registering user.');
            console.error(err);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-center mb-4">Register a New User</h3>
            <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full border px-4 py-2 rounded mb-4"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full border px-4 py-2 rounded mb-4"
            />
            <input
                type="text"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="w-full border px-4 py-2 rounded mb-4"
            />
            <input
                type="number"
                placeholder="Group Size"
                value={formData.groupSize}
                onChange={(e) => setFormData({ ...formData, groupSize: parseInt(e.target.value, 10) })}
                className="w-full border px-4 py-2 rounded mb-4"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                Register
            </button>
        </div>
    );
};

export default RegisterForm;

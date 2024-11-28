import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        groupSize: 1,
    });

    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async () => {
        const { firstName, lastName, mobileNumber, groupSize } = formData;

        if (!firstName || !lastName || !mobileNumber) {
            alert('All fields are required!');
            return;
        }

        setLoading(true); // Start loading

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
        } finally {
            setLoading(false); // Stop loading
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
                className={`px-4 py-2 rounded w-full ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                disabled={loading} // Disable button while loading
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div className="loader mr-2"></div> Submitting...
                    </div>
                ) : (
                    'Register'
                )}
            </button>
            <style jsx>{`
                .loader {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default RegisterForm;

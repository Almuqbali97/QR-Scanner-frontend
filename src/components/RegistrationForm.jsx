import React, { useState } from 'react';
import RegistrationFormFields from './RegistrationFormFields';
import RegistrationSuccessCard from './RegistrationSuccessCard';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        groupSize: 1,
        isGroup: false,
    });
    const [qrCodeData, setQrCodeData] = useState(null); // Success data for QR
    const [responseMessage, setResponseMessage] = useState(''); // To store the response message

    const handleSubmit = async () => {
        const { firstName, lastName, mobileNumber, groupSize } = formData;

        // Validation
        if (!firstName || !lastName || !mobileNumber) {
            setResponseMessage('All fields are required!');
            return;
        }
        if (mobileNumber.length < 8) {
            setResponseMessage('Mobile number must be at least 8 digits long!');
            return;
        }

        try {
            const payload = {
                firstName,
                lastName,
                mobileNumber,
                groupSize: formData.isGroup ? groupSize : 1,
            };
            const response = await axios.post(import.meta.env.VITE_API_URL + "/register", payload);

            setQrCodeData({
                qrValue: response.data.mobileNumber,
                name: `${firstName} ${lastName}`,
                status: 'Registered',
            });

            // Reset form data and message
            setFormData({
                firstName: '',
                lastName: '',
                mobileNumber: '',
                groupSize: 1,
                isGroup: false,
            });
            setResponseMessage('');
        } catch (error) {
            console.error(error);
            setResponseMessage(
                error.response?.data?.message || 'An error occurred during registration.'
            );
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="p-6 max-w-lg min-w-[350px] mx-auto bg-gradient-to-r from-blue-50 to-green-50 shadow-xl rounded-lg">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                    New Registration
                </h2>
                {!qrCodeData ? (
                    <RegistrationFormFields
                        formData={formData}
                        setFormData={setFormData}
                        handleSubmit={handleSubmit}
                    />
                ) : (
                    <RegistrationSuccessCard
                        qrCodeData={qrCodeData}
                        onDownload={() => {
                            // Define download logic here if needed
                        }}
                        onGoBack={() => setQrCodeData(null)}
                    />
                )}
                {responseMessage && (
                    <p className="mt-4 text-center text-sm font-semibold text-red-600">
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RegistrationForm;

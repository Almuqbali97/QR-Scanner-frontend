import React, { useState, useRef } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const RegisteredUser = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [registrationData, setRegistrationData] = useState(null);
    const qrRef = useRef(null);

    const handleFetchRegistration = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/fetch/${mobileNumber}`);
            setRegistrationData(response.data.registration);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error fetching registration');
        }
    };

    return (
        <div>
            <h2>Check Registration</h2>
            <input
                type="text"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="border px-4 py-2 rounded"
            />
            <button onClick={handleFetchRegistration} className="bg-blue-500 text-white px-4 py-2 rounded">
                Fetch Registration
            </button>
            {registrationData && (
                <div>
                    <p><strong>Name:</strong> {registrationData.fullName}</p>
                    <p><strong>Mobile:</strong> {registrationData.mobileNumber}</p>
                    <p><strong>Group Size:</strong> {registrationData.groupSize}</p>
                    <QRCode value={registrationData._id} />
                </div>
            )}
        </div>
    );
};

export default RegisteredUser;

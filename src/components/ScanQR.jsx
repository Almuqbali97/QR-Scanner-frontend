import React, { useState } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

const ScanQR = ({ resetAdminPage }) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isScanning, setIsScanning] = useState(false); // Scanner state

    const handleScan = async (data) => {
        if (data) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-by-mobile/${data}`);
                setResult(response.data);
                setError('');
                setIsScanning(false); // Stop scanning after a successful scan
            } catch (err) {
                setError('QR code is invalid or user not registered.');
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
        setError('Error scanning the QR code.');
    };

    const handleEnter = async (mobileNumber) => {
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/entry', { mobileNumber });
            alert('Entry recorded successfully!');
            console.log('Visit Data:', response.data);

            // Reload the page after a successful entry
            window.location.reload();
        } catch (err) {
            alert('Error recording entry.');
            console.error(err);
        }
    };

    const toggleScanner = () => {
        if (isScanning) {
            // Reload the page when stopping scanning
            window.location.reload();
        } else {
            // Start scanning
            setIsScanning(true);
            setResult(null);
            setError('');
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg rounded-lg">
            <h3 className="text-2xl font-extrabold text-center mb-6 text-indigo-700">QR Code Scanner</h3>
            <button
                onClick={toggleScanner}
                className={`w-full px-6 py-3 font-bold text-white rounded-lg mb-6 shadow-md transition duration-300 ${isScanning
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
            >
                {isScanning ? 'Stop Scanning' : 'Start Scanning'}
            </button>
            {isScanning && (
                <div className="scanner-container mb-6">
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onResult={(result, error) => {
                            if (result) handleScan(result?.text);
                            if (error) handleError(error);
                        }}
                        style={{ width: '100%' }}
                    />
                </div>
            )}
            {error && (
                <p className="text-red-500 font-semibold text-center mt-4 bg-red-50 p-3 rounded-lg shadow-sm">
                    {error}
                </p>
            )}
            {result && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-700 mb-4">User Information</h4>
                    <p className="text-gray-800 mb-2">
                        <span className="font-semibold">Name:</span> {result.fullName}
                    </p>
                    <p className="text-green-600 font-semibold mb-4">
                        <span className="font-semibold">Status:</span> Registered
                    </p>
                    <button
                        onClick={() => handleEnter(result.mobileNumber)}
                        className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
                    >
                        Enter Venue
                    </button>
                </div>
            )}
        </div>
    );
};

export default ScanQR;

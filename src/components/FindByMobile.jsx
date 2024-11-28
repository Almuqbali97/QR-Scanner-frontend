import React, { useState } from 'react';
import axios from 'axios';

const FindByMobile = () => {
    const [searchMobile, setSearchMobile] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!searchMobile) {
            setError('Please enter a valid mobile number.');
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-by-mobile/${searchMobile}`);
            setResult(response.data);
            setError('');
        } catch (err) {
            setError('User not found with this mobile number.');
        }
    };

    const handleEnter = async (mobileNumber) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/entry`, { mobileNumber });
            alert('Entry recorded successfully!');
            console.log('Visit Data:', response.data);

            // Reload the page after a successful entry
            window.location.reload();
        } catch (err) {
            alert('Error recording entry.');
            console.error(err);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-center mb-4">Find by Mobile</h3>
            <input
                type="text"
                placeholder="Enter mobile number"
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
                className="w-full border px-4 py-2 rounded mb-4"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                Search
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {result && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
                    <p className="text-gray-800 mb-2">Name: {result.fullName}</p>
                    <p className="text-green-600 mb-2 font-bold">Status: Registered</p>
                    <button
                        onClick={() => handleEnter(result.mobileNumber)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Enter Venue
                    </button>
                </div>
            )}
        </div>
    );
};

export default FindByMobile;

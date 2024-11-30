import React, { useState } from "react";

const ReportFetcher = () => {
    const [startTime, setStartTime] = useState(""); // User input for start time
    const [endTime, setEndTime] = useState(""); // User input for end time
    const [totalRegistrations, setTotalRegistrations] = useState(null); // Total registrations
    const [totalVisitors, setTotalVisitors] = useState(null); // Total visitors
    const [error, setError] = useState(null); // Error message

    // Function to handle API request
    const fetchReport = async () => {
        try {
            setError(null); // Reset error
            setTotalRegistrations(null); // Reset total registrations
            setTotalVisitors(null); // Reset total visitors

            // Ensure both start and end times are provided
            if (!startTime || !endTime) {
                setError("Both start time and end time are required.");
                return;
            }

            // Construct the JSON payload
            const payload = {
                startTime: new Date(startTime).toISOString(), // Convert input to ISO string
                endTime: new Date(endTime).toISOString(), // Convert input to ISO string
            };

            // Send the request
            const res = await fetch("http://localhost:5000/get-report", {
                method: "POST", // Use POST since we're sending JSON
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Handle the response
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            const data = await res.json();

            // Extract counts from the response
            const registrationsCount = data.registrations?.length || 0; // Count registrations
            const visitorsCount = data.visits?.length || 0; // Count visits

            // Update state
            setTotalRegistrations(registrationsCount);
            setTotalVisitors(visitorsCount);
        } catch (err) {
            setError(err.message); // Set the error message
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Fetch Report</h1>

            {/* Input fields for start and end time */}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Start Time (Oman Time)</label>
                <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2">End Time (Oman Time)</label>
                <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="p-2 border rounded w-full"
                />
            </div>

            {/* Button to fetch the report */}
            <button
                onClick={fetchReport}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Fetch Report
            </button>

            {/* Display response or error */}
            <div className="mt-4">
                {totalRegistrations !== null && totalVisitors !== null && (
                    <div className="p-4 bg-gray-100 rounded">
                        <p><strong>Total Registrations:</strong> {totalRegistrations}</p>
                        <p><strong>Total Visitors:</strong> {totalVisitors}</p>
                    </div>
                )}
                {error && (
                    <div className="text-red-500">
                        <strong>Error:</strong> {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportFetcher;

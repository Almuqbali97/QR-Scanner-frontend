import React, { useState } from 'react';
import ScanQR from './ScanQR';
import FindByMobile from './FindByMobile';
import RegisterForm from './RegisterForm';

const AdminPage = () => {
    const [view, setView] = useState(''); // Current view: 'scan', 'find', or 'register'

    return (
        <div className="h-screen flex justify-center items-center">

            <div className="p-8 max-w-3xl transition-all duration-300 mx-auto bg-gradient-to-r from-blue-50 via-white to-green-50 shadow-lg rounded-xl">
                <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Admin Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <button
                        onClick={() => setView('scan')}
                        className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                    >
                        <div className="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h18M9 3v18M15 3v18M3 9h18M3 15h18"
                                />
                            </svg>
                            <span>QR Scanner</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setView('find')}
                        className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                    >
                        <div className="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16l4-4-4-4m8 8l-4-4 4-4"
                                />
                            </svg>
                            <span>Find by Mobile</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setView('register')}
                        className="bg-gray-600 text-white px-6 py-4 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
                    >
                        <div className="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 12H8m0 0H4m4 0h12M8 12v-8m0 8v8"
                                />
                            </svg>
                            <span>Register Now</span>
                        </div>
                    </button>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-md">
                    {view === '' && (
                        <p className="text-center text-gray-500">
                            Please select an action above to get started.
                        </p>
                    )}
                    {view === 'scan' && <ScanQR />}
                    {view === 'find' && <FindByMobile />}
                    {view === 'register' && <RegisterForm />}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

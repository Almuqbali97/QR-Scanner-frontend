import React, { useState, useEffect } from 'react';
import ScanQR from './ScanQR';
import FindByMobile from './FindByMobile';
import RegisterForm from './RegisterForm';

const AdminPage = () => {
    const [view, setView] = useState(''); // Current view: 'scan', 'find', or 'register'
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Check authentication on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('admin-token');
        if (storedToken) {
            const tokenDate = new Date(parseInt(storedToken, 10));
            const currentDate = new Date();
            const differenceInDays = (currentDate - tokenDate) / (1000 * 60 * 60 * 24);

            if (differenceInDays <= 15) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('admin-token');
            }
        }
    }, []);

    const handleLogin = () => {
        if (username === 'Xevents' && password === 'Imad') {
            setIsAuthenticated(true);
            setError('');
            // Store a token with the current timestamp
            localStorage.setItem('admin-token', Date.now().toString());
        } else {
            setError('Invalid username or password.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin-token');
    };

    if (!isAuthenticated) {
        return (
            <div className="h-screen flex justify-center items-center bg-gray-50">
                <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter password"
                            />
                        </div>
                        <button
                            onClick={handleLogin}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="p-8 max-w-3xl transition-all duration-300 mx-auto bg-gradient-to-r from-blue-50 via-white to-green-50 shadow-lg rounded-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                </div>
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

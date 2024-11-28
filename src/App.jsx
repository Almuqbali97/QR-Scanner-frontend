import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import RegisteredUser from './components/RegisteredUser';
import AdminPage from './components/AdminPage';
// import AdminPage from './pages/admin/AdminPage';
// import AdminPanel from './components/AdminPanel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/registered" element={<RegisteredUser />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import AdminPage from './components/AdminPage';
import ReportFetcher from './components/ReportFetcher';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/report" element={<ReportFetcher />} />

      </Routes>
    </Router>
  );
};

export default App;

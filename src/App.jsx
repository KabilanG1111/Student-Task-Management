import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import WeeklyProgress from './pages/WeeklyProgress';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/student-dashboard" replace />} />
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="progress" element={<WeeklyProgress />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import WeeklyProgress from './pages/WeeklyProgress';
import AdminDashboard from './pages/AdminDashboard';
import SubmitProgress from './pages/SubmitProgress';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/student-dashboard" replace />} />
          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="progress" element={<WeeklyProgress />} />
          <Route path="leaderboard" element={<Navigate to="/student-dashboard" replace />} />
          <Route path="submit" element={<SubmitProgress />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="settings" element={<Navigate to="/student-dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

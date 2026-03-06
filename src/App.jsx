import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import WeeklyProgress from './pages/WeeklyProgress';
import AdminDashboard from './pages/AdminDashboard';
import SubmitProgress from './pages/SubmitProgress';
import LoginPage from './pages/Login';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const studentData = localStorage.getItem('studentData');

  // If no data exists in localStorage, redirect to login
  if (!studentData) {
    return <Navigate to="/login" replace />;
  }

  // If data exists, render the child routes (wrapped in Layout)
  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Set default route to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard routes wrapped in ProtectedRoute and Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/progress" element={<WeeklyProgress />} />
            <Route path="/leaderboard" element={<Navigate to="/student-dashboard" replace />} />
            <Route path="/submit" element={<SubmitProgress />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/settings" element={<Navigate to="/student-dashboard" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

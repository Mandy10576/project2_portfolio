import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProjectsManager from './pages/admin/ProjectsManager';
import SkillsManager from './pages/admin/SkillsManager';
import ExperienceManager from './pages/admin/ExperienceManager';
import AboutManager from './pages/admin/AboutManager';
import ProfileManager from './pages/admin/ProfileManager';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portfolio Website */}
          <Route path="/" element={<HomePage />} />

          {/* Admin Authentication Login */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Admin CMS Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="experience" element={<ExperienceManager />} />
            <Route path="about" element={<AboutManager />} />
            <Route path="profile" element={<ProfileManager />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

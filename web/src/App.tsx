import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Fitness } from './pages/Fitness';
import { AiEngineer } from './pages/AiEngineer';
import { Hackathon } from './pages/Hackathon';
import { Finance } from './pages/Finance';
import { Savings } from './pages/Savings';
import { Fashion } from './pages/Fashion';
import { AiCoach } from './pages/AiCoach';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Application Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="fitness" element={<Fitness />} />
            <Route path="ai-engineer" element={<AiEngineer />} />
            <Route path="hackathon" element={<Hackathon />} />
            <Route path="finance" element={<Finance />} />
            <Route path="savings" element={<Savings />} />
            <Route path="fashion" element={<Fashion />} />
            <Route path="ai-coach" element={<AiCoach />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

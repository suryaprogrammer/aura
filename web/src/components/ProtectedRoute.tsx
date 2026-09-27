import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-xs mb-3">
          <div className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
        </div>
        <p className="text-xs text-[#6B7280] font-medium tracking-wide">Initializing AURA...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setLocalError('Please enter a username.');
      return;
    }
    if (cleanUsername.length < 3) {
      setLocalError('Username must be at least 3 characters.');
      return;
    }
    if (!password) {
      setLocalError('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      await signup({
        username: cleanUsername,
        password,
        confirm_password: confirmPassword,
      });
      navigate('/dashboard', { replace: true });
    } catch {
      // Error handled by AuthContext
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-4 shadow-xs relative">
            <div className="w-5 h-5 rounded-md border-[1.5px] border-[#111827]" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#10B981]" />
          </div>
          <h1 className="text-2xl font-bold tracking-[0.2em] text-[#111827]">AURA</h1>
          <p className="text-xs text-[#6B7280] mt-1 font-medium">Create Personal Operating System Account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#111827]">Create Account</h2>
            <p className="text-xs text-[#6B7280] mt-1">Username and password authentication only</p>
          </div>

          {displayError && (
            <div className="mb-5 p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#EF4444] text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span className="font-medium">{displayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLocalError(null);
                }}
                placeholder="Choose a username (min 3 chars)"
                className="w-full h-11 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] focus:bg-white transition-all font-medium"
                disabled={isLoading}
                autoCapitalize="none"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError(null);
                  }}
                  placeholder="Min 6 characters"
                  className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] focus:bg-white transition-all font-medium"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#9CA3AF] hover:text-[#4B5563]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#374151] mb-1.5">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setLocalError(null);
                }}
                placeholder="Re-enter your password"
                className="w-full h-11 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] focus:bg-white transition-all font-medium"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 rounded-xl bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account & Enter</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center space-y-3">
          <p className="text-xs text-[#6B7280]">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#059669] hover:underline">
              Sign In
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#9CA3AF]">
            <ShieldCheck size={13} className="text-[#10B981]" />
            <span>FastAPI JWT Registration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, LoginInput, SignupInput, AuthState } from "../types/auth";
import { authApi, ApiError } from "../services/api";
import { authStorage } from "../services/authStorage";

interface AuthContextType extends AuthState {
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore authenticated session on initial app load
  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await authStorage.getToken();
        const storedUser = await authStorage.getUser<User>();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          
          // Verify token validity with backend in background
          try {
            const freshUser = await authApi.getMe();
            setUser(freshUser);
            await authStorage.saveUser(freshUser);
          } catch {
            // Token expired or server rejected
            await authStorage.clearAuth();
            setToken(null);
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Failed to restore auth session:", err);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(input);
      setToken(response.access_token);
      setUser(response.user);
      await authStorage.saveToken(response.access_token);
      await authStorage.saveUser(response.user);
    } catch (err: any) {
      const msg = err instanceof ApiError ? err.message : "Failed to log in. Please check your credentials.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.signup(input);
      setToken(response.access_token);
      setUser(response.user);
      await authStorage.saveToken(response.access_token);
      await authStorage.saveUser(response.user);
    } catch (err: any) {
      const msg = err instanceof ApiError ? err.message : "Registration failed. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authStorage.clearAuth();
      setToken(null);
      setUser(null);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      const freshUser = await authApi.getMe();
      setUser(freshUser);
      await authStorage.saveUser(freshUser);
    } catch (err) {
      console.error("Failed to refresh user profile:", err);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        error,
        login,
        signup,
        logout,
        clearError,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

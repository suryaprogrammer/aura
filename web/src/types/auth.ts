export interface User {
  id: number;
  username: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  user: User;
}

export interface SignupInput {
  username: string;
  password: string;
  confirm_password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

import { authStorage } from './authStorage';
import { AuthTokens, LoginInput, SignupInput, User } from '../types/auth';

export class ApiError extends Error {
  statusCode: number;
  data: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = authStorage.getToken();
  const headers = new Headers(options.headers || {});

  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Uses Vite dev server proxy for /api prefix, fallback to direct http://127.0.0.1:8000
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const url = `${baseUrl}${endpoint}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: any) {
    throw new ApiError(
      'Unable to connect to AURA server. Please verify backend is running on http://127.0.0.1:8000.',
      0,
      err
    );
  }

  let data: any = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    if (data?.detail) {
      if (typeof data.detail === 'string') {
        errorMessage = data.detail;
      } else if (Array.isArray(data.detail)) {
        errorMessage = data.detail.map((e: any) => e.msg || e.message).join(', ');
      }
    } else if (data?.message) {
      errorMessage = data.message;
    } else {
      errorMessage = `Server error (${response.status})`;
    }
    throw new ApiError(errorMessage, response.status, data);
  }

  return data as T;
}

export const authApi = {
  async signup(input: SignupInput): Promise<AuthTokens> {
    return request<AuthTokens>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async login(credentials: LoginInput): Promise<AuthTokens> {
    return request<AuthTokens>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async getMe(): Promise<User> {
    return request<User>('/api/auth/me', {
      method: 'GET',
    });
  },
};

export const aiApi = {
  async getCoachResponse(context: string): Promise<{ success: boolean; feature: string; response: string }> {
    return request<{ success: boolean; feature: string; response: string }>('/api/ai/coach', {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  },

  async getStudyPlan(context: string): Promise<{ success: boolean; feature: string; response: string }> {
    return request<{ success: boolean; feature: string; response: string }>('/api/ai/study-plan', {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  },

  async getHackathonAdvice(context: string): Promise<{ success: boolean; feature: string; response: string }> {
    return request<{ success: boolean; feature: string; response: string }>('/api/ai/hackathon-advice', {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  },

  async getSummary(text: string): Promise<{ success: boolean; feature: string; response: string }> {
    return request<{ success: boolean; feature: string; response: string }>('/api/ai/summarize', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },
};

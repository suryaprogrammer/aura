import { authStorage } from "./authStorage";
import { AuthTokens, LoginInput, SignupInput, User } from "../types/auth";

/**
 * API Base URL for the AURA FastAPI backend.
 *
 * Android Emulator  → http://10.0.2.2:8000  (loopback alias to host machine)
 * Physical Android  → replace with your LAN IP, e.g. http://192.168.1.x:8000
 * iOS Simulator     → http://localhost:8000
 */
const API_BASE_URL = "http://10.0.2.2:8000";


export class ApiError extends Error {
  statusCode: number;
  data: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await authStorage.getToken();
  const headers = new Headers(options.headers || {});
  
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${endpoint}`;
  
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: any) {
    throw new ApiError(
      "Unable to reach AURA server. Please check your network or ensure backend is running.",
      0,
      err
    );
  }

  let data: any = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    let errorMessage = "An error occurred";
    if (data?.detail) {
      if (typeof data.detail === "string") {
        errorMessage = data.detail;
      } else if (Array.isArray(data.detail)) {
        errorMessage = data.detail.map((e: any) => e.msg || e.message).join(", ");
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
    return request<AuthTokens>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  async login(credentials: LoginInput): Promise<AuthTokens> {
    return request<AuthTokens>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async getMe(): Promise<User> {
    return request<User>("/api/auth/me", {
      method: "GET",
    });
  }
};

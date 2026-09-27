/**
 * Mobile Authentication Storage
 *
 * Uses expo-secure-store for encrypted, hardware-backed token storage on Android/iOS.
 * Falls back to an in-memory store if SecureStore is unavailable (e.g. Expo web).
 *
 * AURA Security Rule: JWT tokens MUST NEVER be stored in localStorage / AsyncStorage.
 * expo-secure-store uses Android Keystore / iOS Keychain.
 */

import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "aura_jwt_token";
const USER_KEY = "aura_user_profile";

// In-memory fallback (non-persistent — used when SecureStore is unavailable)
let memoryToken: string | null = null;
let memoryUser: string | null = null;

export const authStorage = {
  async saveToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch {
      memoryToken = token;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch {
      return memoryToken;
    }
  },

  async removeToken(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch {
      memoryToken = null;
    }
  },

  async saveUser(user: any): Promise<void> {
    try {
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    } catch {
      memoryUser = JSON.stringify(user);
    }
  },

  async getUser<T>(): Promise<T | null> {
    try {
      const raw = await SecureStore.getItemAsync(USER_KEY);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return memoryUser ? (JSON.parse(memoryUser) as T) : null;
    }
  },

  async clearAuth(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch {
      memoryToken = null;
      memoryUser = null;
    }
  },
};


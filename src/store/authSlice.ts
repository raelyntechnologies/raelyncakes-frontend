import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User, AuthState } from "@/types/user";

const STORAGE_KEY = "raelyn_auth";

// Load initial state from localStorage
const loadAuthState = (): AuthState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        user: parsed.user,
        isAuthenticated: !!parsed.user,
        isLoading: false,
      };
    }
  } catch (error) {
    console.error("Failed to load auth state:", error);
  }
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

const saveAuthState = (user: User | null) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error("Failed to save auth state:", error);
  }
};

const USERS_KEY = "raelyn_users";

const getUsers = (): Record<string, { user: User; password: string }> => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const saveUsers = (users: Record<string, { user: User; password: string }>) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      saveAuthState(action.payload);
    },
    loginFailure: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      saveAuthState(null);
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveAuthState(state.user);
      }
    },
  },
});

export const { setLoading, loginSuccess, loginFailure, logout, updateUser } =
  authSlice.actions;

// Thunk-like actions
export const signup = (
  phone: string,
  password: string,
  name: string
): { success: boolean; error?: string } => {
  const users = getUsers();

  if (users[phone]) {
    return { success: false, error: "Phone number already registered" };
  }

  const newUser: User = {
    userid: crypto.randomUUID(),
    phone,
    name,
    role: "user",
  };

  users[phone] = { user: newUser, password };
  saveUsers(users);

  return { success: true };
};

export const login = (
  phone: string,
  password: string
): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();
  const userRecord = users[phone];

  if (!userRecord) {
    return { success: false, error: "User not found" };
  }

  if (userRecord.password !== password) {
    return { success: false, error: "Invalid password" };
  }

  return { success: true, user: userRecord.user };
};

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsAdmin = (state: RootState) =>
  state.auth.user?.role === "admin";

export default authSlice.reducer;

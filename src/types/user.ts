export type UserRole = "user" | "admin";

export interface User {
  userid: string;
  name: string;
  phone?: string;
  role: UserRole;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  dob: string;
  isDefault: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

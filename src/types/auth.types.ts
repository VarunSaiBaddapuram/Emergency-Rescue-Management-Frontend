export type Role = "admin" | "reliefCenter" | "collectionCenter";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  phoneNumber?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

export interface AuthResponseData {
  token: string;
  user: User;
}

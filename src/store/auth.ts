import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User, AuthResponseData } from "../types/auth.types";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
const initialUser: User | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: AuthState = {
  isAuthenticated: !!storedToken,
  token: storedToken || null,
  user: initialUser || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthResponseData>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;

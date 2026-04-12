import axiosInstance from "./axiosInstance";
import { User, AuthResponseData } from "../types/auth.types";
import { ApiResponse } from "../types/api.types";

export const authApi = {
  login: async (credentials: any): Promise<ApiResponse<AuthResponseData>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponseData>>("/user/signin", credentials);
    return response.data;
  },

  signup: async (userData: any, agencyKey: string): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.post<ApiResponse<any>>("/user/signup", userData, {
      headers: {
        "x-agency-key": agencyKey,
      },
    });
    return response.data;
  },

  verifyToken: async (): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.post<ApiResponse<any>>("/user/auth");
    return response.data;
  },

  getUser: async (id: string): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get<ApiResponse<User>>(`/user/getuser/${id}`);
    return response.data;
  },
};

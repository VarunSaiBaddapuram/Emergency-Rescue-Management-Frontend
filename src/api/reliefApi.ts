import axiosInstance from "./axiosInstance";
import { ApiResponse } from "../types/api.types";

import { ReliefCenter, ReliefSupplyRequest } from "../types/relief.types";

export const reliefApi = {
  getAllCenters: async (): Promise<ReliefCenter[]> => {
    const response = await axiosInstance.get<ReliefCenter[]>("/relief/reliefcenters");
    return response.data;
  },

  getCenterById: async (id: string): Promise<ReliefCenter | ReliefCenter[]> => {
    const response = await axiosInstance.get<ReliefCenter | ReliefCenter[]>(`/relief/getreliefcenterbyid/${id}`);
    return response.data;
  },

  createCenter: async (data: any): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.post<ApiResponse<any>>("/relief/addreliefcenter", data);
    return response.data;
  },

  updateAdmission: async (id: string, admission: number): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.put<ApiResponse<any>>(`/relief/addadmission/${id}`, { Admission: admission });
    return response.data;
  },

  getSupplyRequests: async (): Promise<ReliefSupplyRequest[]> => {
    const response = await axiosInstance.get<ReliefSupplyRequest[]>("/relief/getreliefsupply");
    return response.data;
  },

  getSupplyRequestsByCreator: async (userId: string): Promise<ReliefSupplyRequest[]> => {
    const response = await axiosInstance.get<ReliefSupplyRequest[]>(`/relief/getSupplyReqbyCreator/${userId}`);
    return response.data;
  },

  getSupplyRequestsByAccepted: async (userId: string): Promise<ReliefSupplyRequest[]> => {
    const response = await axiosInstance.get<ReliefSupplyRequest[]>(`/relief/getSupplyReqbyAccepted/${userId}`);
    return response.data;
  },

  createSupplyRequest: async (data: Partial<ReliefSupplyRequest>): Promise<ApiResponse<ReliefSupplyRequest>> => {
    const response = await axiosInstance.post<ApiResponse<ReliefSupplyRequest>>("/relief/addreliefsupplyrequest", data);
    return response.data;
  },

  confirmDelivery: async (id: string): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.put<ApiResponse<any>>(`/relief/confirmdelivery/${id}`);
    return response.data;
  },
};

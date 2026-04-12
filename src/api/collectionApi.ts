import axiosInstance from "./axiosInstance";
import { ApiResponse } from "../types/api.types";
import { CollectionCenter } from "../types/collection.types";

export const collectionApi = {
  createCenter: async (data: Partial<CollectionCenter>): Promise<ApiResponse<CollectionCenter>> => {
    const response = await axiosInstance.post<ApiResponse<CollectionCenter>>("/collection/addCollectioncenter", data);
    return response.data;
  },

  getAllCenters: async (): Promise<CollectionCenter[]> => {
    const response = await axiosInstance.get<CollectionCenter[]>("/collection/getCollectionCenter");
    return response.data;
  },

  getCenterByIncharge: async (userId: string): Promise<CollectionCenter | CollectionCenter[]> => {
    const response = await axiosInstance.get<CollectionCenter | CollectionCenter[]>(`/collection/getCollectionCenterById/${userId}`);
    return response.data;
  },

  acceptDelivery: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.put<ApiResponse<any>>(`/collection/acceptDelivery/${id}`, data);
    return response.data;
  },

  dispatchItem: async (id: string, data: any): Promise<ApiResponse<any>> => {
    const response = await axiosInstance.put<ApiResponse<any>>(`/collection/dispatch/${id}`, data);
    return response.data;
  },
};

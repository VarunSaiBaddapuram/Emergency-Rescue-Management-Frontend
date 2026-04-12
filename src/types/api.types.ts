export interface ApiResponse<T = any> {
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
  status?: number;
}

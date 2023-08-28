export interface ApiResponse {
  data?: {
    error?: string;
    isSuccess: boolean;
    value?: any;
  };
}

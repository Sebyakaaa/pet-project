import axios, { AxiosInstance } from 'axios';

export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseUrl = '/posts') {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async get<T>(endpoint = ''): Promise<T> {
    const { data } = await this.axiosInstance.get<T>(endpoint);
    return data;
  }

  async post<T, D>(endpoint: string, body: D): Promise<T> {
    const { data } = await this.axiosInstance.post<T>(endpoint, body);
    return data;
  }

  async put<T, D>(endpoint: string, body: D): Promise<T> {
    const { data } = await this.axiosInstance.put<T>(endpoint, body);
    return data;
  }

  async patch<T, D>(endpoint: string, body: D): Promise<T> {
    const { data } = await this.axiosInstance.patch<T>(endpoint, body);
    return data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const { data } = await this.axiosInstance.delete<T>(endpoint);
    return data;
  }
}

export const apiService = new ApiService();

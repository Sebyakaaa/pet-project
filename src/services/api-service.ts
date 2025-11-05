import axios from 'axios';

export class ApiService {
  private baseURL: string;

  constructor(baseUrl = '/posts') {
    this.baseURL = baseUrl;
  }

  private url(endpoint: string): string {
    return `${this.baseURL}/${endpoint}`;
  }

  async get<T>(endpoint = ''): Promise<T> {
    const { data } = await axios.get<T>(this.url(endpoint));
    return data;
  }

  async post<T, D>(endpoint: string, body: D): Promise<T> {
    const { data } = await axios.post<T>(this.url(endpoint), body);
    return data;
  }

  async put<T, D>(endpoint: string, body: D): Promise<T> {
    const { data } = await axios.put<T>(this.url(endpoint), body);
    return data;
  }

  async patch<T, D>(endpoint: string, body: D): Promise<T> {
    const { data } = await axios.patch<T>(this.url(endpoint), body);
    return data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const { data } = await axios.delete<T>(this.url(endpoint));
    return data;
  }
}

export const apiService = new ApiService();

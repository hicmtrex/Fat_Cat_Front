import axios, { AxiosInstance } from 'axios';

export const baseUrl = import.meta.env.VITE_API_URL;

export const fetchApi: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

const authApi: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

export const authorizationProvider = (token: string) => {
  authApi.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default authApi;

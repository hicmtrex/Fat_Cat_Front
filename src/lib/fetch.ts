import axios, { AxiosInstance } from 'axios';
import { UserInfo } from '../utils/interfaces/user.interface';

export const baseUrl = 'https://fat-cat-production.up.railway.app';

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

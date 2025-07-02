import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://dot-daily.onrender.com/api/v1';
const DEFAULT_TIMEOUT = 30000;

const isBrowser = () => typeof window !== 'undefined';

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (isBrowser()) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.log('[Axios][Request Error]', error);
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && isBrowser()) {
      window.location.href = '/login';
    }
    console.log('[Axios][Response Error]', error);
    return Promise.reject(error);
  }
);
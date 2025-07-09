import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://dot-daily.onrender.com/api/v1';
const DEFAULT_TIMEOUT = 60000;

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
        if (token.startsWith('Bearer ')) {
          config.headers['Authorization'] = token;
        } else {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
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
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      console.warn('⏰ 서버 응답 시간 초과 - Render.com 콜드 스타트일 가능성');
      if (isBrowser()) {
        alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.\n(첫 접속 시 서버 시작에 시간이 걸릴 수 있습니다)');
      }
    }
    
    if (error.response?.status === 401 && isBrowser()) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    console.log('[Axios][Response Error]', error);
    return Promise.reject(error);
  }
);
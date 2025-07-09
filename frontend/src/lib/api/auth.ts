import { httpClient } from './http';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  accessToken: string;
  token: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await httpClient.post('/auth/login', credentials);
  
  // 백엔드 응답 구조에 따라 토큰 경로 확인
  const accessToken = response.data.data?.accessToken || response.data.accessToken;
  if (accessToken) {
    // Bearer 접두사가 있는지 확인하고 순수 토큰만 저장
    const cleanToken = accessToken.startsWith('Bearer ') 
      ? accessToken.substring(7) 
      : accessToken;
    localStorage.setItem('accessToken', cleanToken);
  }
  
  return response.data.data || response.data;
};

// 로그아웃 함수
export const logout = async () => {
  try {
    await httpClient.post('/auth/logout');
  } catch (error) {
    console.error('로그아웃 API 호출 실패:', error);
    // API 실패해도 로컬 토큰은 제거
  } finally {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
  }
};

// 회원가입 함수
export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await httpClient.post('/auth/register', userData);
  return response.data;
};

// 현재 토큰이 유효한지 확인
export const checkAuth = () => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

// 테스트용 자동 로그인 함수
export const autoLogin = async () => {
  try {
    // 테스트 계정으로 자동 로그인
    const testCredentials = {
      email: 'test@example.com',
      password: 'test123'
    };
    
    console.log('🔑 로그인 시도:', testCredentials.email);
    const result = await login(testCredentials);
    console.log('✅ 자동 로그인 성공:', result);
    return result;
      } catch (error: unknown) {
      console.error('❌ 자동 로그인 실패:', error);
      
      // 에러 타입 체크 및 변환
      const axiosError = error as { response?: { status?: number } };
      
      // 만약 계정이 없다면 회원가입 시도
      if (axiosError.response?.status === 401 || axiosError.response?.status === 404) {
      try {
        console.log('📝 계정이 없어서 회원가입 시도...');
        await register({
          username: 'testuser',
          email: 'test@example.com',
          password: 'test123'
        });
        console.log('✅ 회원가입 성공, 다시 로그인 시도...');
        return await login({
          email: 'test@example.com',
          password: 'test123'
        });
      } catch (registerError) {
        console.error('❌ 회원가입도 실패:', registerError);
        throw registerError;
      }
    }
    
    throw error;
  }
}; 
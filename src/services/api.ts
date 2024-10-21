import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // 기본 API URL 설정
  timeout: 3000, // 타임아웃 시간 설정 (ms)
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    serviceKey: process.env.REACT_APP_SERVICE_KEY, // Open API 서비스키
    returnType: 'json', // 데이터 타입  
  } 
});


/**
 * 가스 사용량 통계
 * @param params 
 * @returns 
 */
export const getGas = async (params: any) => { 
  try {
    const response = await api.get('getGas', {
      params: {
        ...params,
      } 
    });
    return response.data;

  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

/**
 * 수도 사용량 통계
 * @param params 
 * @returns 
 */
export const getWtspl = async (params: any) => {
  try {
    const response = await api.get('getWtspl', {
      params: {
        ...params,
      } 
    });
    return response.data;

  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};


/**
 * 전기 사용량 통계
 * @param params 
 * @returns 
 */
export const getElec = async (params: any) => {
  try {
    const response = await api.get('getElec', {
      params: {
        ...params,
      } 
    });
    return response.data;

  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // 기본 API URL 설정
  timeout: 3000, // 타임아웃 시간 설정 (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});



export const getGas = async (params: any) => {
  try {
    const response = await api.get('getGas', {
      params: {
        serviceKey: process.env.REACT_APP_SERVICE_KEY,  
        returnType: 'json', // 데이터 타입  
        ...params,
      } 
    });
    return response.data;

  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

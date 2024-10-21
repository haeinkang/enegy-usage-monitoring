import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 기본 API URL 설정
  timeout: 5000, // 타임아웃 시간 설정 (ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Params {
  serviceKey: string;
  pageNo: number;
  numOfRows: number;
  rlvtYr?: string;
  lclgvNm?: string;
  returnType: 'json' | 'xml';
}

export const getGas = async (params: Params) => {
  try {
    const response = await api.get('/getGas', { params });
    return response.data;

  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

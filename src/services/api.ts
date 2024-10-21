import axios from 'axios';
import { ApiRequestParams, ApiResponse, ApiResponseBody } from '../types';

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
 */
export const getGas = async (params: ApiRequestParams): Promise<ApiResponse<ApiResponseBody>> => { 
  try {
    const response = await api.get<ApiResponse<ApiResponseBody>>(
      'getGas', {
      params: {
        ...params,
      } 
    });

    return response.data;

  } catch (error) {
    console.error("getGas API 호출 에러:", error);
    throw error;
  }
};


/**
 * 수도 사용량 통계
 */
export const getWtspl = async (params: ApiRequestParams): Promise<ApiResponse<ApiResponseBody>> => { 
  try {
    const response = await api.get<ApiResponse<ApiResponseBody>>(
      'getWtspl', {
      params: {
        ...params,
      } 
    });

    return response.data;

  } catch (error) {
    console.error("getWtspl API 호출 에러:", error);
    throw error;
  }
};




/**
 * 전기 사용량 통계
 */
export const getElec = async (params: ApiRequestParams): Promise<ApiResponse<ApiResponseBody>> => { 
  try {
    const response = await api.get<ApiResponse<ApiResponseBody>>(
      'getElec', {
      params: {
        ...params,
      } 
    });

    return response.data;

  } catch (error) {
    console.error("getElec API 호출 에러:", error);
    throw error;
  }
};

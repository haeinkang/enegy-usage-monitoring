import axios from 'axios';
import { ApiResponse, ApiResponseBody, LclgvCoords } from '../types';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // 기본 API URL 설정
  timeout: 3000, // 타임아웃 시간 설정 (ms)
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    pageNo: 1, // 페이지번호
    numOfRows: 300, // 한 페이지 결과 수   
    serviceKey: process.env.REACT_APP_SERVICE_KEY, // Open API 서비스키
    returnType: 'json', // 데이터 타입  
  } 
});


/**
 * 가스 사용량 통계
 */
export const getGas = async (): Promise<ApiResponse<ApiResponseBody>> => { 
  try {
    const response = await api.get<ApiResponse<ApiResponseBody>>('getGas');

    return response.data;

  } catch (e) {
    console.error("getGas API 호출 에러:", e);
    throw e;
  }
};


/**
 * 수도 사용량 통계
 */
export const getWtspl = async (): Promise<ApiResponse<ApiResponseBody>> => { 
  try {
    const response = await api.get<ApiResponse<ApiResponseBody>>('getWtspl');

    return response.data;

  } catch (e) {
    console.error("getWtspl API 호출 에러:", e);
    throw e;
  }
};




/**
 * 전기 사용량 통계
 */
export const getElec = async (): Promise<ApiResponse<ApiResponseBody>> => { 
  try {
    const response = await api.get<ApiResponse<ApiResponseBody>>('getElec');

    return response.data;

  } catch (e) {
    console.error("getElec API 호출 에러:", e);
    throw e;
  }
};


/** 지자체별 위도, 경도 가져오기 */
export const fetchLclgvCoords = async (): Promise<LclgvCoords> => {
  try {
    const res = await fetch('/json/lclgv-coords.json'); 
    const data: LclgvCoords = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
    return {}
  }
};


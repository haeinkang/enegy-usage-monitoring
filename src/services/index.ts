import axios from 'axios';

export * from './energy-usage-api';
export * from './air-qual-api';
// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/ArpltnInforInqireSvc`, // 기본 API URL 설정
  timeout: 3000, // 타임아웃 시간 설정 (ms)
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    pageNo: 1, // 페이지번호
    serviceKey: process.env.REACT_APP_SERVICE_KEY, // Open API 서비스키
    returnType: 'json', // 데이터 타입  
  } 
});
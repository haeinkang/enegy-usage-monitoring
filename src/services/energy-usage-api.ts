import axios from 'axios';
import { EnerygyUsageApiResItem, EnerygyUsageApiRes, LclgvCoords, RegionMapping } from '../types';

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/kecoapi/cpointEnrgUsqntStatsService`, // 기본 API URL 설정
  // timeout: 3000, // 타임아웃 시간 설정 (ms)
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
export const getGas = async (): Promise<EnerygyUsageApiResItem[]> => { 
  try {
    const res = await api.get<EnerygyUsageApiRes>('getGas');

    return res.data.body.items;

  } catch (e) {
    console.error("getGas API 호출 에러:", e);
    throw e;
  }
};


/**
 * 수도 사용량 통계
 */
export const getWtspl = async (): Promise<EnerygyUsageApiResItem[]> => { 
  try {
    const res = await api.get<EnerygyUsageApiRes>('getWtspl');

    return res.data.body.items;

  } catch (e) {
    console.error("getWtspl API 호출 에러:", e);
    throw e;
  }
};




/**
 * 전기 사용량 통계
 */
export const getElec = async (): Promise<EnerygyUsageApiResItem[]> => { 
  try {
    const res = await api.get<EnerygyUsageApiRes>('getElec');

    return res.data.body.items;

  } catch (e) {
    console.error("getElec API 호출 에러:", e);
    throw e;
  }
};


/** 
 * 행정구역(시,구,군) 가져오기 
 * @returns '{ "부산 청룡동": "금정구", ... }'
 */
export const fetchRegionMapping = async (): Promise<RegionMapping> => {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/json/region-mapping.json`); 
    const data = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
    return {}
  }
};

/** 
 * 시도별 위도, 경도 가져오기
 * @returns '{ "부산": [129.075641, 35.179554], ... }' 
 */
export const fetchSidoCoords = async (): Promise<LclgvCoords> => {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/json/sido-coords.json`); 
    const data: LclgvCoords = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
    return {}
  }
};

/** 
 * 지자체별 위도, 경도 가져오기 
 * @returns '{ "부산 금정구": [129.092749, 35.242010], ... }' 
 */
export const fetchLclgvCoords = async (): Promise<LclgvCoords> => {
  try {
    const res = await fetch(`${process.env.PUBLIC_URL}/json/lclgv-coords.json`); 
    const data: LclgvCoords = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
    return {}
  }
};
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
 * 시도명을 검색조건으로 하여 
 * 시도별 측정소목록에 대한 
 * 일반 항목과 CAI최종 실시간 측정값과 지수 정보 조회 기능을 
 * 제공하는 시도별 실시간 측정정보 조회
 */
export const getCtprvnRltmMesureDnsty = async () => {
  try {
    const res = await api.get<any>(
      'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
      {
        params: {
          numOfRows: 661,
          pageNo: 1,
          sidoName:	'전국',		// 시도 이름(전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종)
          ver: '1.0'	// 버전별 상세 결과 참고
        }
      }
    );
    
    return res
  } catch(e) {

  }
}

/** 
 * 통보코드와 통보시간으로 예보정보와 발생 원인 정보를 조회하는 대기질(미세먼지/오존) 예보통보 조회
 */
export const getMinuDustFrcstDspth = async () => {
  try {
    const res = await api.get<any>(
      'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth',
      {
        params: {
          serviceKey: process.env.REACT_APP_SERVICE_KEY,
          returnType: 'json',
          numOfRows: 100,
          pageNo: 1,
          // searchDate: '2020-11-14', // 통보시간 검색(조회 날짜 입력이 없을 경우 한달동안 예보통보 발령 날짜의 리스트 정보를 확인)
          InformCode: 'PM10' // 통보코드검색(PM10, PM25, O3)
        }
      }
    );

  } catch(e) {

  }
}

/** 
 * 시도별 실시간 평균정보 조회 
 */
export const getCtprvnMesureLIst = async () => {
  try {
    const res = await api.get<any>(
      'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnMesureLIst',
      {
        params: {
          serviceKey: process.env.REACT_APP_SERVICE_KEY,
          returnType: 'json',
          numOfRows: 100,
          pageNo: 1,
          itemCode: 'CO', // (SO2, CO, O3, NO2, PM10, PM25)
          dataGubun: 'DAILY', // 요청 자료 구분(시간평균 : HOUR, 일평균 : DAILY)
          searchCondition: 'MONTH' // 요청 데이터기간 (일주일 : WEEK, 한달 : MONTH)
        }
      }
    );

  } catch(e) {

  }
}




/**
 * 가스 사용량 통계
 */
export const getGas = async (): Promise<ApiResponse<ApiResponseBody>> => { 
  try {
    const res = await api.get<ApiResponse<ApiResponseBody>>('getGas');

    return res.data;

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
    const res = await api.get<ApiResponse<ApiResponseBody>>('getWtspl');

    return res.data;

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
    const res = await api.get<ApiResponse<ApiResponseBody>>('getElec');

    return res.data;

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

/** 행정구역(시,구,군) 가져오기 */
export const fetchCityDists = async (): Promise<{ [key: string]: string }> => {
  try {
    const res = await fetch('/json/city-districts.json'); 
    const data: { [key: string]: string } = await res.json();
    return data
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
    return {}
  }
};


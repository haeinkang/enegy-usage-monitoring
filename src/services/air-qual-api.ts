import axios from 'axios';
import { AirQualByRegApiRes } from '../types';

// Axios 인스턴스 생성
const api = axios.create({
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


/**
 * 시도명을 검색조건으로 하여 
 * 시도별 측정소목록에 대한 
 * 일반 항목과 CAI최종 실시간 측정값과 지수 정보 조회 기능을 
 * 제공하는 시도별 실시간 측정정보 조회
 */
export const getCtprvnRltmMesureDnsty = async (): Promise<AirQualByRegApiRes> => {
  try {
    const res = await api.get<AirQualByRegApiRes>('getCtprvnRltmMesureDnsty',
      {
        params: {
          numOfRows: 661,
          pageNo: 1,
          sidoName:	'전국',		// 시도 이름(전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종)
          ver: '1.0'	// 버전별 상세 결과 참고
        }
      }
    );
    
    return res.data;
  } catch(e) {
    console.error("getCtprvnRltmMesureDnsty API 호출 에러:", e);
    throw e;
  }
}

/** 
 * 시도별 실시간 평균정보 조회 
 */
export const getCtprvnMesureLIst = async (): Promise<AirQualByRegApiRes> => {
  try {
    const res = await api.get<AirQualByRegApiRes>(
      'getCtprvnMesureLIst',
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
    return res.data;
  } catch(e) {
    console.error("getCtprvnMesureLIst API 호출 에러:", e);
    throw e;
  }
}




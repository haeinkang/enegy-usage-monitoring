import { ApiResponseHeader, ApiResponseBody, GeoCoord } from ".";


/** 시도별 대기질 API 응답값 타입 별칭 */
export type AirQualByRegApiRes = AirQualByRegApiResponse<ApiResponseBody<AirQualByRegion>>;

/** 시도별 대기질 API 응답값 */
export interface AirQualByRegApiResponse<T> {
  response: {
    header: ApiResponseHeader;
    body: T;
  }
}

/** 지역별 대기질 정보 */
export interface AirQualByRegion { 
  /** 
   * 시도명 
   * sampleData: 서울, 부산... 
   */
  sidoName: string; 
  /** 
   * 측정소명 
   * sampleData: 홍릉로 
   */
  stationName: string; 
  /** 
   * 도시대기측정망 정보
   * sampleData: 도시대기, 도로변대기, 국가배경농도, 교외대기, 항만) 
   */	
  mangName:	string;	
  /** 
   * 오염도 측정 일시
   * sampleData: 2020-11-25 11:00
   */
  dataTime:	string; 
  /** 
   * 아황산가스 농도(단위: ppm)
   * sampleData: 0.007
   */
  so2Value:	string;
  /**
   * 일산화탄소 농도(단위: ppm)
   * 0.7
   */
  coValue:	string;
  /** 오존 농도(단위: ppm)
   * sampleData: 0.043
   */
  o3Value:	string;
  /** 
   * 이산화질소 농도(단위: ppm)
   * sampleData: 0.043
   */
  no2Value:	string; 
  /** 
   * 미세먼지(PM10) 농도 (단위: ug/m3))
   * sampleData: 68
   */
  pm10Value:	string; 
  /** 
   * 미세먼지(PM10) 24시간 예측이동농도	(단위: ug/m3)
   * sampleData: 56
   */
  pm10Value24: string;
  /**
   * 초미세먼지(PM2.5) 농도(단위: ug/m3)
   * sampleData: 39
   */
  pm25Value: string;
  /**
   * 초미세먼지(PM2.5) 농도24시간 예측이동농도(단위: ug/m3)
   * sampleData: 26
   */	
  pm25Value24: string;
  /**
   * 통합대기환경수치	
   * sampleData: 76
   */
  khaiValue: string;
  /** 
   * 통합대기환경지수	
   * sampleData: 2
   */
  khaiGrade: string;
  /**
   * 아황산가스 지수	
   * sampleData: 1
   */
  so2Grade: string;	
  /** 
   * 일산화탄소 지수 
   * sampleData: 1
   */
  coGrade: string;
  /** 
   * 오존 지수	
   * sampleData: 2
   */
  o3Grade: string;
  /** 
   * 이산화질소 지수 
   * sampleData: 2
   */	
  no2Grade: string;
}

/** 지표값을 number로 변환한 지자체별 대기질 정보 */
export interface AirQualByLclgvNumeric { 
  /**
   * 지자체명
   * sampleData: 서울 강남구
   */
  lclgvNm: string;
  /**
   * 지자체 [경도, 위도]
   */
  coord: GeoCoord;
  /** 
   * 오염도 측정 일시
   * sampleData: 2020-11-25 11:00
   */
  dataTime: string; 
  /** 
   * 아황산가스 농도(단위: ppm)
   * sampleData: 0.007
   */
  so2Value: number;
  /**
   * 일산화탄소 농도(단위: ppm)
   * sampleData: 0.7
   */
  coValue: number;
  /** 오존 농도(단위: ppm)
   * sampleData: 0.043
   */
  o3Value: number;
  /** 
   * 이산화질소 농도(단위: ppm)
   * sampleData: 0.043
   */
  no2Value: number; 
  /** 
   * 미세먼지(PM10) 농도 (단위: ug/m3))
   * sampleData: 68
   */
  pm10Value: number; 
  /** 
   * 미세먼지(PM10) 24시간 예측이동농도	(단위: ug/m3)
   * sampleData: 56
   */
  pm10Value24: number;
  /**
   * 초미세먼지(PM2.5) 농도(단위: ug/m3)
   * sampleData: 39
   */
  pm25Value: number;
  /**
   * 초미세먼지(PM2.5) 농도24시간 예측이동농도(단위: ug/m3)
   * sampleData: 26
   */	
  pm25Value24: number;
  /**
   * 통합대기환경수치	
   * sampleData: 76
   */
  khaiValue: number;
  /** 
   * 통합대기환경지수	
   * sampleData: 2
   */
  khaiGrade: number;
  /**
   * 아황산가스 지수	
   * sampleData: 1
   */
  so2Grade: number;	
  /** 
   * 일산화탄소 지수 
   * sampleData: 1
   */
  coGrade: number;
  /** 
   * 오존 지수	
   * sampleData: 2
   */
  o3Grade: number;
  /** 
   * 이산화질소 지수 
   * sampleData: 2
   */	
  no2Grade: number;
}

/**
 * 대기질 지표 리스트
 */
export type AirQualByRegMerics = (keyof AirQualByRegion)[];
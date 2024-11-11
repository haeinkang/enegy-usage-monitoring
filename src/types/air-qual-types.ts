import { ApiResponseHeader, ApiResponseBody, GeoCoord } from ".";


/** 시도별 대기질 API 응답값 타입 별칭 */
export type AirQualByRegApiRes = AirQualByRegApiResponse<ApiResponseBody<AirQualByStation>>;

/** 시도별 대기질 API 응답값 */
export interface AirQualByRegApiResponse<T> {
  response: {
    header: ApiResponseHeader;
    body: T;
  }
}

/** 측정소별 대기질 정보 */
export interface AirQualByStation extends AirQualCommon<string> { 
  /** 측정소명 (학동로) */
  stationName: string;
  /** 시도명 (서울) */
  sidoName: string;
  /** 오염도 측정 일시 (2020-11-25 11:00) */
  dataTime: string; 
}

/** 지자체별 대기질 정보 */
export interface AirQualByLclgv extends AirQualCommon<number> { 
  /** 지자체명 (서울 강남구) */
  lclgvNm: string;
  /** 시도명 (서울) */
  sidoName: string;
  /** 오염도 측정 일시 (2020-11-25 11:00) */
  dataTime: string; 
}

/** 
 *  지자체별 대기질 정보
 *  + 지표값을 number로 변환
 *  + 지자체의 [경도, 위도] 정보 추가  
 */
export interface AirQualByLclgvNumeric extends AirQualCommon<number> { 
  /** 지자체명 (서울 강남구) */
  lclgvNm: string;
  /** 지자체의 [경도, 위도] */
  coord: GeoCoord;
  /** 오염도 측정 일시 (2020-11-25 11:00) */
  dataTime: string; 
}

/** 공통 대기질 정보 */
export interface AirQualCommon<T> {
  /** 아황산가스 농도 */
  so2Value: T;

  /** 일산화탄소 농도 */
  coValue: T;

  /** 오존 농도 */
  o3Value: T;

  /** 이산화질소 농도 */
  no2Value: T;

  /** 미세먼지(PM10) 지수 */
  pm10Grade: T;

  /** 미세먼지(PM10) 농도 */
  pm10Value: T;

  /** 초미세먼지(PM2.5) 지수 */
  pm25Grade: T;

  /** 초미세먼지(PM2.5) 농도 */
  pm25Value: T;

  /** 통합대기환경수치 */
  khaiValue: T;

  /** 통합대기환경지수 */
  khaiGrade: T;

  /** 아황산가스 지수 */
  so2Grade: T;

  /** 일산화탄소 지수 */
  coGrade: T;

  /** 오존 지수 */
  o3Grade: T;

  /** 이산화질소 지수 */
  no2Grade: T;
}

export type PollutionLevel = "좋음" | "보통" | "나쁨" | "매우 나쁨";

export type AirQualMetric = {
  name: string;
  ko: string;    // 한국어 이름
  en: string;    // 영어 이름
  unit: string;  // 측정 단위
  min: number;   // 최소값
  max: number;   // 최대값
  range: [number, number]; // 출력할 범위 
  selected: boolean;
}
import { ApiResponse, ApiResponseBody } from ".";

/** 에너지 사용량 API 응답값 */
export type AirQualByRegionApiRes = ApiResponse<ApiResponseBody<AirQualByRegion>>;

/** 시도별 대기질 정보 */
export interface AirQualByRegion { 
  /** 
   * 측정소명 
   * sampleData: 중구 
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
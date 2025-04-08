/** [위도, 경도] */
export type GeoCoord = GasUsageItemWithCoord["coord"];
/**
 * 위도와 경도를 포함한 가스 사용량 데이터 타입
 */
export type GasUsageItemWithCoord = GasUsageItem & {
  coord: [latitude: number, longitude: number];
};

/**
 * 위도와 경도를 포함한 공기질 데이터 타입
 */
export type AirQualItemWithCoord = AirQualItem & {
  coord: GeoCoord;
};

export type GasUsageItem = {
  avgUseQnt: number;
  lclgvNm: string;
  rlvtYr: string;
};

export type AirQualItem = {
  /**
   * 시도명
   * sampleData: 서울
   */
  sidoName: string;
  /**
   * 측정소명
   * sampleData: 종로구
   */
  stationName: string;
  /**
   * 측정 일시
   * sampleData: 2025-04-04 14:00
   */
  dataTime: string;
  /**
   * 아황산가스 농도(단위: ppm)
   * sampleData: 0.004
   */
  so2Value: string;
  /**
   * 아황산가스 지수
   * sampleData: 1
   */
  so2Grade: string;
  /**
   * 아황산가스 측정 여부 (값이 없으면 null)
   * sampleData: null
   */
  so2Flag: string | null;
  /**
   * 일산화탄소 농도(단위: ppm)
   * sampleData: 0.3
   */
  coValue: string;
  /**
   * 일산화탄소 지수
   * sampleData: 1
   */
  coGrade: string;
  /**
   * 일산화탄소 측정 여부 (값이 없으면 null)
   * sampleData: null
   */
  coFlag: string | null;
  /**
   * 오존 농도(단위: ppm)
   * sampleData: 0.078
   */
  o3Value: string;
  /**
   * 오존 지수
   * sampleData: 2
   */
  o3Grade: string;
  /**
   * 오존 측정 여부 (값이 없으면 null)
   * sampleData: null
   */
  o3Flag: string | null;
  /**
   * 이산화질소 농도(단위: ppm)
   * sampleData: 0.017
   */
  no2Value: string;
  /**
   * 이산화질소 지수
   * sampleData: 1
   */
  no2Grade: string;
  /**
   * 이산화질소 측정 여부 (값이 없으면 null)
   * sampleData: null
   */
  no2Flag: string | null;
  /**
   * 미세먼지(PM10) 농도 (단위: ug/m3)
   * sampleData: 42
   */
  pm10Value: string;
  /**
   * 미세먼지(PM10) 지수
   * sampleData: 2
   */
  pm10Grade: string;
  /**
   * 미세먼지(PM10) 측정 여부 (값이 없으면 null)
   * sampleData: null
   */
  pm10Flag: string | null;
  /**
   * 초미세먼지(PM2.5) 농도 (단위: ug/m3)
   * sampleData: 30
   */
  pm25Value: string;
  /**
   * 초미세먼지(PM2.5) 지수
   * sampleData: 2
   */
  pm25Grade: string;
  /**
   * 초미세먼지(PM2.5) 측정 여부 (값이 없으면 null)
   * sampleData: null
   */
  pm25Flag: string | null;
  /**
   * 통합대기환경수치
   * sampleData: 100
   */
  khaiValue: string;
  /**
   * 통합대기환경지수
   * sampleData: 2
   */
  khaiGrade: string;
};

export type ResponseBody<T> = {
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: T[]; // GasUsageItem || AirQualItem
};

export type ResponseHeader = {
  resultCode: string;
  resultMsg: string;
};

export type ApiResponse<T> = {
  body: ResponseBody<T>;
  header: ResponseHeader;
};

export type WrappedApiResponse<T> = {
  response: ApiResponse<T>;
};

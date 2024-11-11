import { 
  ApiResponseHeader, 
  ApiResponseBody, 
  GeoCoord, 
  AirQualByLclgv, 
} from ".";

/** 에너지 사용량 API 응답값 타입 별칭 */
export type EnerygyUsageApiRes = EnerygyUsageApiResponse<ApiResponseBody<EnerygyUsageApiResItem>>;

/** 에너지 사용량 API 응답값 */
export interface EnerygyUsageApiResponse<T> {
  header: ApiResponseHeader;
  body: T;
}

/** 지자체별 평균 사용량 */
export interface EnerygyUsageApiResItem { 
  /** 평균 사용량 */
  avgUseQnt: number;
  /** 지자체명 */
  lclgvNm: string;
  /** 해당 년도 */
  rlvtYr: string;
}

export interface EnergyUsage { 
  /** 지자체명 */
  lclgvNm: string;
  /** 가스 사용량 */
  gas: number;
  /** 전기 사용량 */
  elec: number;
  /** 물 사용량 */
  water: number;
}

/** 
 * 좌표값을 추가한 
 * 지자체별 가스 평균 사용량 
 */
export interface GasUsageByLclgv  { 
  /** 지자체명 */
  lclgvNm: string;
  /** 지자체의 [경도, 위도] */
  coord: GeoCoord;
  /** 가스 평균 사용량 */
  avgUseQnt: number;
  /** 해당 년도 */
  rlvtYr: string;
}

/** 지자체별 위도,경도 정보 */
export interface LclgvCoords {
  [lclgvNm: string]: GeoCoord;
}
/**
 * { "부산 청룡동": "금정구", ... }
 */
export interface RegionMapping {
  [key: string]: string;
}

/** ************************************************ */

/**
 * 에너지 사용량과 대기질 데이터를 합친 정보
 */
export interface EnergyAndAirData {
  /** 시도명 (서울) */
  sidoName: string; 
  /** 지자체명 (서울 강남구) */
  lclgvNm: string;
  /** 지자체의 [경도, 위도] */
  coord: GeoCoord;
  energyUsage: EnergyUsage;
  airQual?: AirQualByLclgv; 
}
import { ApiResponseHeader, ApiResponseBody } from ".";

/** 에너지 사용량 API 응답값 타입 별칭 */
export type EnerygyUsageApiRes = EnerygyUsageApiResponse<ApiResponseBody<UsageByLclgv>>;

/** 에너지 사용량 API 응답값 */
export interface EnerygyUsageApiResponse<T> {
  header: ApiResponseHeader;
  body: T;
}

/** 지자체별 평균 사용량 */
export interface UsageByLclgv { 
  /** 평균 사용량 */
  avgUseQnt: number;
  /** 지자체명 */
  lclgvNm: string;
  /** 해당 년도 */
  rlvtYr: string;
}

/** [경도, 경도] */
export type GeoCoord = [number, number];

/** 지자체별 위도,경도 정보 */
export interface LclgvCoords {
  [lclgvNm: string]: GeoCoord;
}
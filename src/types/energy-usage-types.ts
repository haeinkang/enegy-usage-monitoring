import { ApiResponse, ApiResponseBody } from ".";

/** 에너지 사용량 API 응답값 */
export type EnerygyUsageApiRes = ApiResponse<ApiResponseBody<UsageByLclgv>>;


/** 지자체별 평균 사용량 */
export interface UsageByLclgv { 
  /** 평균 사용량 */
  avgUseQnt: number;
  /** 지자체명 */
  lclgvNm: string;
  /** 해당 년도 */
  rlvtYr: string;
}

/** [위도, 경도] */
export type GeoCoord = [number, number];

/** 지자체별 위도,경도 */
export interface LclgvCoords {
  [lclgvNm: string]: GeoCoord;
}
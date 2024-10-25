export interface ApiRequestParams {
  pageNo?: number;
  numOfRows?: number;
  rlvtYr?: string;
  lclgvNm?: string;
}
export interface ApiResponse<T> {
  header: ApiResponseHeader;
  body: T;
}

export interface ApiResponseHeader {
  /** 응답 메시지 */
  resultMsg: string;
  /** 응답 코드 */
  resultCode: string;
}

export interface ApiResponseBody<T> {
  /** UsageByLclgv */
  items: T[]; 
  /** 한 페이지 결과 수 */
  numOfRows: number;
  /** 응답 결과 수 */
  totalCount: number;
  /** 페이지 번호 */
  pageNo: number;
}



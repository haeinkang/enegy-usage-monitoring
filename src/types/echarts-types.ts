import { GeoCoord } from '.'

/**
 * ECharts data 타입
 */
export interface Data {
  name: string
  value: number
}

/**
 * ECharts에서 지리적 데이터를 시각화하기 위해 위도/경도값과 value를 결합
 */
export interface ConvertData {
  name: string; 
  value: [...GeoCoord, number]
}
/** [경도, 경도] */
export type GeoCoord = [number, number];
/** [경도, 경도, value] */
export type GeoCoordVal = [...GeoCoord, number];

/**
 * ECharts에서 지리적 데이터를 시각화하기 위해 위도/경도값과 value를 결합
 */
export interface EchartMapData {
  name: string; 
  value: GeoCoordVal
}
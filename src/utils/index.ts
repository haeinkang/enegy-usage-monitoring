import { EnergyAndAirData, GeoCoord } from '../types'
import { findIndex, map } from 'lodash'


/**
 * 두 좌표 간의 거리 계산 함수 (단순 유클리드 거리)
 * @param coord1 [number, number] 
 * @param coord2 [number, number] 
 * @returns number (단위: km)
 */
export const calculateDistance = (
  coord1: GeoCoord, 
  coord2: GeoCoord
): number => {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;
  const R = 6371; // 지구 반지름(km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

/**
 * 특정 지자체의 가스 사용량 순위를 상위 백분율로 반환
 * @param 가스 사용량 리스트
 * @param 지자체명
 * @returns 백분율
 */
export const getTopPercent = (
  list: EnergyAndAirData[],
  lclgvNm: string
): number => {
  const energyUsageList = map(list, 'energyUsage')
  const targetIndex = findIndex(energyUsageList, { lclgvNm });
  return Math.floor((targetIndex + 1) / (energyUsageList.length) * 100);
}

/**
 * 가스 사용량에 따른 색상 className 정의
 * @param topPercent: 상위 n % 
 * @returns 색상 팔레트명 
 */
export const getPaletteNm = (topPercent: number): string => {
  if (topPercent >= 80) return '--level-1-blue'; // 파랑 (매우 좋음)
  if (topPercent >= 60) return '--level-2-green'; // 초록색 (좋음)
  if (topPercent >= 40) return '--level-3-yellow'; // 노란색 (보통)
  if (topPercent >= 20) return '--level-4-orange'; // 주황색 (나쁨)
  if (topPercent >= 0) return '--level-5-red'; // 빨간색 (매우 나쁨)
  return '--no-data-black'; // 회색
};

/**
 * 상위 퍼센트에 따른 색상 코드 정의
 * @param topPercent: 상위 n % 
 * @returns 색상코드 (파랑 | 초록 | 노랑 | 주황 | 빨강 | 회색)
 */ 
export const getColorCode = (topPercent: number): string => {
  if (topPercent >= 80) return '#0d6efd'; // 파랑 (매우 좋음)
  if (topPercent >= 60) return '#198754'; // 초록색 (좋음)
  if (topPercent >= 40) return '#ffc107'; // 노란색 (보통)
  if (topPercent >= 20) return '#ff8f07'; // 주황색 (나쁨)
  if (topPercent >= 0) return '#dc3545'; // 빨간색 (매우 나쁨)
  return '#D4D9DE'; // 회색
};

/**
 * 미세먼지 농도에 따른 색상 코드와 상태 정의
 * @param pm10 
 * @returns 색상코드
 */
export const getPm10Color = (pm10: number): string => {
  if (pm10 <= 50) return 'var(--level-1-blue)'; // 파랑 (매우 좋음)
  if (pm10 <= 100) return 'var(--level-2-green)'; // 초록색 (좋음)
  if (pm10 <= 250) return 'var(--level-3-yellow)'; // 노란색 (보통)
  if (pm10 <= 350) return 'var(--level-4-orange)'; // 주황색 (나쁨)
  return 'var(--level-5-red)'; // 빨간색 (매우 나쁨)
};

/**
 * 지표와 수치에따른 상태값 
 * @param metric 지표
 * @param value 수치
 * @returns "좋음" | "보통" | "나쁨" | "매우 나쁨"
 */
export const getPolutionLevel = (metric: string, value?: number) => {
  if(value == null) return '-'

  switch (metric) {
    case "khaiValue":
      if (value <= 50) return "좋음";
      if (value <= 100) return "보통";
      if (value <= 250) return "나쁨";
      return "매우 나쁨";

    case "pm10Value":
      if (value <= 30) return "좋음";
      if (value <= 80) return "보통";
      if (value <= 150) return "나쁨";
      return "매우 나쁨";

    case "pm25Value":
      if (value <= 15) return "좋음";
      if (value <= 35) return "보통";
      if (value <= 75) return "나쁨";
      return "매우 나쁨";

    case "coValue":
      if (value <= 2) return "좋음";
      if (value <= 9) return "보통";
      if (value <= 15) return "나쁨";
      return "매우 나쁨";

    case "no2Value":
      if (value <= 0.03) return "좋음";
      if (value <= 0.06) return "보통";
      if (value <= 0.2) return "나쁨";
      return "매우 나쁨";

    case "so2Value":
      if (value <= 0.02) return "좋음";
      if (value <= 0.05) return "보통";
      if (value <= 0.15) return "나쁨";
      return "매우 나쁨";

    case "o3Value":
      if (value <= 0.03) return "좋음";
      if (value <= 0.09) return "보통";
      if (value <= 0.15) return "나쁨";
      return "매우 나쁨";

    default:
      throw new Error("지원되지 않는 오염물질입니다.");
  }
}

/**
 * 지표와 수치에 따른 색상 코드
 * @param metric 지표
 * @param value 수치
 * @returns 파랑 | 초록 | 주황 | 빨강
 */
export const getLevelColor = (metric: string, value?: number) => {
  if (value == null) return 'var(--no-data-black)';

  switch (metric) {
    case "khaiValue":
      if (value <= 50) return 'var(--level-1-blue)';
      if (value <= 100) return 'var(--level-2-green)';
      if (value <= 250) return 'var(--level-4-orange)';
      return 'var(--level-5-red)';

    case "pm10Value":
      if (value <= 30) return 'var(--level-1-blue)';
      if (value <= 80) return 'var(--level-2-green)';
      if (value <= 150) return 'var(--level-4-orange)';
      return 'var(--level-5-red)';

    case "pm25Value":
      if (value <= 15) return 'var(--level-1-blue)';
      if (value <= 35) return 'var(--level-2-green)';
      if (value <= 75) return 'var(--level-4-orange)';
      return 'var(--level-5-red)';

    case "coValue":
      if (value <= 2) return 'var(--level-1-blue)';
      if (value <= 9) return 'var(--level-2-green)';
      if (value <= 15) return 'var(--level-4-orange)';
      return 'var(--level-5-red)';

    case "no2Value":
      if (value <= 0.03) return 'var(--level-1-blue)';
      if (value <= 0.06) return 'var(--level-2-green)';
      if (value <= 0.2) return 'var(--level-4-orange)';
      return 'var(--level-5-red)';

    case "so2Value":
      if (value <= 0.02) return 'var(--level-1-blue)';
      if (value <= 0.05) return 'var(--level-2-green)';
      if (value <= 0.15) return 'var(--level-4-orange)';
      return 'var(--level-5-red)';

    case "o3Value":
      if (value <= 0.03) return 'var(--level-1-blue)';;
      if (value <= 0.09) return 'var(--level-2-green)';
      if (value <= 0.15) return 'var(--level-4-orange)';
      return 'var(--level-5-red)';

    default:
      return '#D4D9DE'
  }
}

/**
 * Echart용 지표와 수치에 따른 색상 코드
 * @param metric 지표
 * @param value 수치
 * @returns 파랑 | 초록 | 주황 | 빨강
 */
export const getEchartLevelColor = (metric: string, value?: number) => {
  if (value == null) return '#D4D9DE';
  switch (metric) {
    case "khaiValue":
      if (value <= 50) return '#0d6efd';
      if (value <= 100) return '#198754';
      if (value <= 250) return '#ff8f07';
      return '#dc3545';

    case "pm10Value":
      if (value <= 30) return '#0d6efd';
      if (value <= 80) return '#198754';
      if (value <= 150) return '#ff8f07';
      return '#dc3545';

    case "pm25Value":
      if (value <= 15) return '#0d6efd';
      if (value <= 35) return '#198754';
      if (value <= 75) return '#ff8f07';
      return '#dc3545';

    case "coValue":
      if (value <= 2) return '#0d6efd';
      if (value <= 9) return '#198754';
      if (value <= 15) return '#ff8f07';
      return '#dc3545';

    case "no2Value":
      if (value <= 0.03) return '#0d6efd';
      if (value <= 0.06) return '#198754';
      if (value <= 0.2) return '#ff8f07';
      return '#dc3545';

    case "so2Value":
      if (value <= 0.02) return '#0d6efd';
      if (value <= 0.05) return '#198754';
      if (value <= 0.15) return '#ff8f07';
      return '#dc3545';

    case "o3Value":
      if (value <= 0.03) return '#0d6efd';;
      if (value <= 0.09) return '#198754';
      if (value <= 0.15) return '#ff8f07';
      return '#dc3545';

    default:
      return '#D4D9DE'
  }
}
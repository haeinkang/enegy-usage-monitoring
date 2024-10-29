/**
 * 미세먼지 농도에 따른 색상 코드와 상태 정의
 * @param pm10 
 * @returns 색상코드
 */
export const getAirQualityColor = (pm10: number): string => {
  if (pm10 <= 50) return '#1040ff'; // 파랑 (매우 좋음)
  if (pm10 <= 100) return '#4CAF50'; // 초록색 (좋음)
  if (pm10 <= 250) return '#FFEB3B'; // 노란색 (보통)
  if (pm10 <= 350) return '#ff8610'; // 주황색 (나쁨)
  return '#F44336'; // 빨간색 (매우 나쁨)
};
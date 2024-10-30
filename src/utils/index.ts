/**
 * 가스 사용량에 따른 색상 className 정의
 * @param max: number
 * @param val: number
 * @returns 색상코드
 */
export const getColorClassName = (
  max: number, 
  val: number
): string => {
  if (val <= max * 0.2) return '--level-1-blue'; // 파랑 (매우 좋음)
  if (val <= max * 0.4) return '--level-2-green'; // 초록색 (좋음)
  if (val <= max * 0.6) return '--level-3-yellow'; // 노란색 (보통)
  if (val <= max * 0.8) return '--level-4-orange'; // 주황색 (나쁨)
  return '--level-5-red'; // 빨간색 (매우 나쁨)
};

/**
 * 가스 사용량에 따른 색상 코드 정의
 * @param max: number
 * @param val: number
 * @returns 색상코드
 */
export const getGasUsageColor = (
  max: number, 
  val: number
): string => {
  console.log({ max, val})
  if (val <= max * 0.2) return 'var(--level-1-blue)'; // 파랑 (매우 좋음)
  if (val <= max * 0.4) return 'var(--level-2-green)'; // 초록색 (좋음)
  if (val <= max * 0.6) return 'var(--level-3-yellow)'; // 노란색 (보통)
  if (val <= max * 0.8) return 'var(--level-4-orange)'; // 주황색 (나쁨)
  return 'var(--level-5-red)'; // 빨간색 (매우 나쁨)
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
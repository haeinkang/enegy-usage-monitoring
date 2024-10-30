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

/**
 * 지표와 수치에따른 상태값 
 * @param metric 지표
 * @param value 수치
 * @returns "좋음" | "보통" | "나쁨" | "매우 나쁨"
 */
export const getPolutionLevel = (metric: string, value: number) => {
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
export const getLevelColor = (metric: string, value: number) => {
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
      return '#3d281f'
  }
}

/**
 * Echart용 지표와 수치에 따른 색상 코드
 * @param metric 지표
 * @param value 수치
 * @returns 파랑 | 초록 | 주황 | 빨강
 */
export const getEchartLevelColor = (metric: string, value: number) => {
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
      return '#3d281f'
  }
}
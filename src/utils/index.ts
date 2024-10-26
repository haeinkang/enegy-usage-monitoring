// string → float로 변환하는 함수 (숫자가 아닌 값은 null로 반환)
export const stringToFloat = (value: string | null): number | null => {
  const parsed = value ? parseFloat(value): NaN;
  return isNaN(parsed) ? null : parsed;
};
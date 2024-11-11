import { AirQualByRegApiRes, AirQualByStation } from '../types';
import { api } from '.';

/**
 * 시도명을 검색조건으로 하여 
 * 시도별 측정소목록에 대한 
 * 일반 항목과 CAI최종 실시간 측정값과 지수 정보 조회 기능을 
 * 제공하는 시도별 실시간 측정정보 조회
 */
export const getCtprvnRltmMesureDnsty = async (): Promise<AirQualByStation[]> => {
  try {
    const res = await api.get<AirQualByRegApiRes>('getCtprvnRltmMesureDnsty',
      {
        params: {
          numOfRows: 661,
          pageNo: 1,
          sidoName:	'전국',		// 시도 이름(전국, 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종)
          ver: '1.0'	// 버전별 상세 결과 참고
        }
      }
    );
    return res.data.response.body.items;
  } catch(e) {
    console.error("getCtprvnRltmMesureDnsty API 호출 에러:", e);
    throw e;
  }
}

/** 
 * 측정소명과 측정데이터 기간(일,한달,3개월)으로 
 * 해당 측정소의 일반항목 측정정보를 제공하는 
 * 측정소별 실시간 측정정보조회
 */
export const getCtprvnMesureLIst = async (): Promise<AirQualByRegApiRes> => {
  try {
    const res = await api.get<AirQualByRegApiRes>(
      'getMsrstnAcctoRltmMesureDnsty',
      {
        params: {
          numOfRows: 100,
          itemCode: 'CO', // (SO2, CO, O3, NO2, PM10, PM25)
          dataGubun: 'HOUR', // 요청 자료 구분(시간평균 : HOUR, 일평균 : DAILY)
          searchCondition: 'WEEK', // 요청 데이터기간 (일주일 : WEEK, 한달 : MONTH)
          stationName: '종로구', // 측정소 이름 (종로구)
          dataTerm: '1MONTH', // 요청 데이터기간(1일: DAILY, 1개월: MONTH, 3개월: 3MONTH)
          ver: '1.4'// 오퍼레이션 버전
        }
      }
    );
    return res.data;
  } catch(e) {
    console.error("getCtprvnMesureLIst API 호출 에러:", e);
    throw e;
  }
}




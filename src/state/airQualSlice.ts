import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AirQualByLclgvNumeric, AirQualByRegMerics, } from '../types'
import { getCtprvnRltmMesureDnsty } from '../services'
import _, { find, reduce, meanBy } from "lodash";
import { RootState } from '../state/store';

interface AirQaulState {
  loading: boolean;
  data: AirQualByLclgvNumeric[]; 
  selected?: AirQualByLclgvNumeric;
  metrics: {
    [key: string]: { 
      ko: string; 
      en: string;
      unit: string;
    }
  };
}

const initialState: AirQaulState = {
  loading: true,
  data: [], 
  selected: undefined,
  metrics: {
    khaiValue: {
      ko: '통합대기환경', 
      en: 'KHAI', 
      unit: ''
    },
    pm10Value: {
      ko: '미세먼지',
      en: 'PM10',
      unit: 'ug/m3',
    },
    pm25Value: {
      ko: '초미세먼지',
      en: 'PM2.5',
      unit: 'ug/m3',
    },
    coValue: {
      ko: '일산화탄소',
      en: 'CO',
      unit: 'ppm',
    },
    no2Value: {
      ko: '이산화질소',
      en: 'NO2',
      unit: 'ppm',
    },
    so2Value: {
      ko: '아황산가스',
      en: 'SO2',
      unit: 'ppm',
    },
    o3Value: {
      ko: '오존 지수',
      en: 'O3',
      unit: '',
    },
  }
}


const airQualSlice = createSlice({
  name: 'airQual', 
  initialState,
  reducers: {
    selectLclgvNm: (state, action) => {
      const res = find(state.data, o => o.lclgvNm === action.payload)
      state.selected = res;
    },
  }, 
  extraReducers: (builder) => {
    builder.addCase(
      getAirQualData.fulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      }
    )
    builder.addCase(
      getAirQualData.rejected,
      (state) => {
        console.log('getAirQualData.rejected')
        state.loading = false;
      }
    )
  }
})

export const getAirQualData = createAsyncThunk(
  "airQual/fetchAirQaul", 
  async (__, { getState }) => {
    const { response: { body: { items } }} = await getCtprvnRltmMesureDnsty();
    const state = getState() as RootState;
    const regionMapping = state.coordSlice.regionMapping;
    const lclgvCoords = state.coordSlice.lclgvCoords;

    const res: AirQualByLclgvNumeric[] = _(items)
        // 지자체명으로 groupBy 
        // ex) 서울 학동로 -> 서울 강남구
        .groupBy(o => {
          const adr =  `${o.sidoName} ${o.stationName}` 
          const districts = regionMapping[adr] // 지자체명 맵핑
          return `${o.sidoName} ${districts}`
        })
        // 각 지자체의 대기질 지표별 평균값 계산
        .map((items, lclgvNm) => {      
          /** 평균을 구하고자 하는 대기질 측정 지표 리스트 */
          const metrics: AirQualByRegMerics = _(items[0])
            .keys() 
            .filter((metric) => 
              metric !== 'sidoName' 
              && metric !== 'stationName'
              && metric !== 'mangName'
              && metric !== 'dataTime'
            )
            .value() as AirQualByRegMerics;

          /** 각 지자체별 평균값을 가진 새로운 객체 생성 */
          const averageValues = reduce(metrics, (acc, key) => {
            return { 
              ...acc, 
              [key]: Number(meanBy(items, o => parseFloat(o[key]) || 0).toFixed(1))
            }
          }, {});  

          return {
            lclgvNm,
            coord: lclgvCoords[lclgvNm],
            ...averageValues
          } as AirQualByLclgvNumeric
        })
        .value()

    return res;
  }
)


export const { 
  selectLclgvNm,
} = airQualSlice.actions;

export default airQualSlice.reducer;
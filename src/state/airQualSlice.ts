import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AirQualByLclgvNumeric, AirQualMetric } from '../types'
import { getCtprvnRltmMesureDnsty } from '../services'
import _, { map, find, reduce, meanBy, cloneDeep, min, max } from "lodash";
import { RootState } from '../state/store';

interface AirQaulState {
  loaded: boolean;
  error: string | null;
  data: AirQualByLclgvNumeric[]; 
  selected?: AirQualByLclgvNumeric;
  metrics: AirQualMetric[];
}

const initialState: AirQaulState = {
  loaded: false,
  error: null,
  data: [], 
  selected: undefined,
  metrics: [
    {
      name: 'khaiValue',
      ko: '통합대기환경', 
      en: 'KHAI', 
      unit: '',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'pm10Value',
      ko: '미세먼지',
      en: 'PM10',
      unit: 'ug/m3',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: true,
    },
    {
      name: 'pm25Value',
      ko: '초미세먼지',
      en: 'PM2.5',
      unit: 'ug/m3',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'coValue',
      ko: '일산화탄소',
      en: 'CO',
      unit: 'ppm',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'no2Value',
      ko: '이산화질소',
      en: 'NO2',
      unit: 'ppm',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'so2Value',
      ko: '아황산가스',
      en: 'SO2',
      unit: 'ppm',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'o3Value',
      ko: '오존 지수',
      en: 'O3',
      unit: '',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
  ]
}

const airQualSlice = createSlice({
  name: 'airQual', 
  initialState,
  reducers: {
    selectLclgvNm: (state, action) => {
      const res = find(state.data, o => o.lclgvNm === action.payload)
      state.selected = res;
    },
    selectMetric: (state, action) => {
      state.metrics = map(state.metrics, (item) => ({
        ...item, 
        selected: item.name === action.payload
      }))
    }, 
    changeRange: (state, action) => {
      state.metrics = map(state.metrics, item => ({
        ...item, 
        range: item.selected 
          ? action.payload 
          : [item.max, item.max]
      }))
    },
  }, 

})




export const { 
  selectLclgvNm,
  selectMetric,
  changeRange,
} = airQualSlice.actions;

export default airQualSlice.reducer;
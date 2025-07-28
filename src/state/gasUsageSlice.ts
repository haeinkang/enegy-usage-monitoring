import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  EnergyAndAirData,
  GasUsageByLclgv,
  AirQualCommon,
  AirQualByLclgv, 
  AirQualMetric,
  AirQualByStation
} from '../types'
import { getGas, getCtprvnRltmMesureDnsty, fetchRegionMapping, getElec, getWtspl } from '../services'
import _, { find, slice, includes, map, maxBy, orderBy, reduce, meanBy, get, compact } from "lodash";
import { RootState } from './store';
import { fetchLclgvCoords } from '../services'

interface GasUsageState {
  loaded: boolean;
  energyAirData: EnergyAndAirData[];
  eventError: string | null;
  apiError: string | null;
  max?: GasUsageByLclgv;
  hoveredItem?: EnergyAndAirData;
  clickedItem?: EnergyAndAirData;
  metrics: AirQualMetric[];
}

const initialState: GasUsageState = {
  energyAirData: [],
  eventError: null,
  apiError: null,
  loaded: false,
  metrics: [
    {
      name: 'khai',
      ko: '통합대기환경', 
      en: 'KHAI', 
      unit: '',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'pm10',
      ko: '미세먼지',
      en: 'PM10',
      unit: 'ug/m3',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: true,
    },
    {
      name: 'pm25',
      ko: '초미세먼지',
      en: 'PM2.5',
      unit: 'ug/m3',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'co',
      ko: '일산화탄소',
      en: 'CO',
      unit: 'ppm',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'no2',
      ko: '이산화질소',
      en: 'NO2',
      unit: 'ppm',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'so2',
      ko: '아황산가스',
      en: 'SO2',
      unit: 'ppm',
      min: 0, 
      max: 0,
      range: [0, 0],
      selected: false,
    },
    {
      name: 'o3',
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

const gasUsageSlice = createSlice({
  name: 'gasUsage', 
  initialState,
  reducers: {
    hover: (state, action) => {
      state.hoveredItem = action.payload;
      state.eventError = null;
    }, 
    click: (state, action) => {
      state.clickedItem = action.payload;
      state.eventError = null;
    }, 
  }, 
  extraReducers: (builder) => {
    builder.addCase(
      getEnergyAirData.fulfilled,
      (state, action) => {
        console.log(action.payload);
        state.energyAirData = action.payload;
        state.apiError = null;
        state.loaded = true;
      }
    );
    builder.addCase(
      getEnergyAirData.rejected,
      (state, action) => {
        console.error('getEnergyAirData.rejected', action.error)
        state.apiError = null;
        state.loaded = true;
      }
    )
  }
})

export const getEnergyAirData = createAsyncThunk(
  "gasUsage/getEnergyAirData",
  async () => {
    try {
      const [gasUsage, elecUsage, waterUsage, airData, regionMapping, lclgvCoords] = await Promise.all([
        getGas(),
        getElec(), 
        getWtspl(),
        getCtprvnRltmMesureDnsty(),
        fetchRegionMapping(),
        fetchLclgvCoords(),
      ]);

      const lclgvNmList = map(gasUsage, 'lclgvNm');

      // 각 사용 데이터를 객체에 저장
      const groupedData = _.groupBy([...gasUsage, ...elecUsage, ...waterUsage], 'lclgvNm');
      // 새로운 energyUsageList 배열 생성
      const energyUsageList = compact(
        map(groupedData, (_, lclgvNm) => {
          const gas = find(gasUsage, { lclgvNm })?.avgUseQnt;
          const elec = find(elecUsage, { lclgvNm })?.avgUseQnt;
          const water = find(waterUsage, { lclgvNm })?.avgUseQnt;
          const sidoName = lclgvNm.split(' ')[0];

          if(!gas || !elec || !water || !sidoName) return null;
          return { sidoName, lclgvNm, gas, elec, water };
        })
      )

      // Calculate average air quality metrics per local government
      const airDataByLclgv = _(airData)
        .groupBy((entry) => {
          const address = `${entry.sidoName} ${entry.stationName}`;
          const district = regionMapping[address];
          return `${entry.sidoName} ${district}`;
        })
        .map((airDataList, lclgvNm) => {
          // Helper to calculate average metrics for each local government
          const calculateAverageMetrics = () =>
            reduce(
              airMetrics,
              (acc, metric) => {
                const average = meanBy(airDataList, (o) => Number(o[metric]) || 0);
                acc[metric as AirQualCommonKeys] = Number(average.toFixed(1));
                return acc;
              },
              {} as AirQualCommon<number>
            );
          
          return {
            lclgvNm,
            sidoName: airDataList[0].sidoName,
            dataTime: airDataList[0].dataTime,
            ...calculateAverageMetrics(),
          } as AirQualByLclgv;
        })
        .filter((entry) => includes(lclgvNmList, entry.lclgvNm))
        .value();

      // Combine gas usage and air quality data with coordinates
      const combinedData: EnergyAndAirData[] = _(energyUsageList)
        .orderBy(['gas'], ['desc'])
        .map((item) => {
          const airQuality = find(airDataByLclgv, { lclgvNm: item.lclgvNm });
          return {
            sidoName: airQuality?.sidoName || '',
            lclgvNm: item.lclgvNm,
            coord: lclgvCoords[item.lclgvNm],
            energyUsage: item,
            airQual: airQuality,
          };
        })
        .value()

      return combinedData;
      
    } catch (error) {
      throw error;
    }
  }
);

export const { 
  hover,
  click,
} = gasUsageSlice.actions;

export default gasUsageSlice.reducer;



// AirQualCommon 타입에 포함된 키들을 유니온 타입으로 정의
type AirQualCommonKeys = keyof AirQualCommon<number>;

/** 대기질 지표 리스트 */
const airMetrics: AirQualCommonKeys[] = [
  "khaiValue",
  "khaiGrade",
  "pm10Value",
  "pm10Grade",
  "pm25Value",
  "pm25Grade",
  "so2Value",
  "so2Grade",
  "coValue",
  "coGrade",
  "no2Value",
  "no2Grade",
  "o3Value",
  "o3Grade",
];

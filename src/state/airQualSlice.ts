import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  AirQualByLclgvNumeric, 
  AirQualByRegMerics 
} from '../types'
import { 
  getCtprvnRltmMesureDnsty, 
  fetchCityDists,
  fetchLclgvCoords,
  fetchSidoCoords,
} from '../services'
import _ from "lodash";

interface AirQaulState {
  data: AirQualByLclgvNumeric[]
}

const initialState: AirQaulState = {
  data: []
}


const airQualSlice = createSlice({
  name: 'airQual', 
  initialState,
  reducers: {

  }, 
  extraReducers: (builder) => {
    builder.addCase(
      getAirQualData.pending, 
      () => {
        console.log('getAirQualData.pending')
      }
    );
    builder.addCase(
      getAirQualData.fulfilled,
      (state, action) => {
        state.data = action.payload;
      }
    )
  }
})

export const getAirQualData = createAsyncThunk(
  "airQual/fetchAirQaul", 
  async () => {
    const { response: { body: { items } }} = await getCtprvnRltmMesureDnsty();
    const cityDists = await fetchCityDists();
    const lclgvCoords  = await fetchLclgvCoords();

    const res: AirQualByLclgvNumeric[] = _(items)
        // 지자체명으로 groupBy 
        // ex) 서울 학동로 -> 서울 강남구
        .groupBy(o => {
          const adr =  `${o.sidoName} ${o.stationName}` 
          const districts = cityDists[adr] // 지자체명 맵핑
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
          const averageValues = _.reduce(metrics, (acc, key) => {
            return { 
              ...acc, 
              [key]: _.meanBy(items, o => parseFloat(o[key]) || 0)
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
} = airQualSlice.actions;

export default airQualSlice.reducer;
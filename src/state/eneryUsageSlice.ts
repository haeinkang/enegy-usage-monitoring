import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EnergyUsageByLclgv } from '../types'
import { getGas, getElec } from '../services'
import _, { meanBy } from "lodash";
import { RootState } from '../state/store';

interface EnergyUsageState {
  data: EnergyUsageByLclgv[]
}

const initialState: EnergyUsageState = {
  data: []
}

const energyUsageSlice = createSlice({
  name: 'eneryUsage', 
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(
      getEnergyUsage.pending, 
      () => {
        console.log('fetchEneryUsage.pending')
      }
    );
    builder.addCase(
      getEnergyUsage.fulfilled,
      (state, action) => {
        state.data = action.payload;
      }
    )
  }
})

export const getEnergyUsage = createAsyncThunk(
  "eneryUsage/fetchEneryUsage", 
  async (undefined, { getState }) => {
    const [gasRes, elecRes] = await Promise.all([getGas(), getElec()]);
    const state = getState() as RootState;
    const sidoCoords = state.coordSlice.sidoCoords;

    const gasData = _(gasRes)
        .groupBy(item => item.lclgvNm.split(' ')[0])
        .map((items, city) => ({
          lclgvNm: city,
          gas: Math.round(meanBy(items, 'avgUseQnt') * 10) / 10
        }))
        .value()

      const elecData = _(elecRes)
        .groupBy(item => item.lclgvNm.split(' ')[0])
        .map((items, city) => ({
          lclgvNm: city,
          elec: Math.round(meanBy(items, 'avgUseQnt') * 10) / 10
        }))
        .value()
        
      const res =_([...gasData, ...elecData])
        .groupBy(item => item.lclgvNm)
        .map((items) => items.reduce(
          (acc, item) => ({ 
            ...acc, 
            ...item, 
            coord: sidoCoords[item.lclgvNm] 
          }), {})
        ) 
        .value() as EnergyUsageByLclgv[]

      return res;
  }
)

export const { 
} = energyUsageSlice.actions;

export default energyUsageSlice.reducer;
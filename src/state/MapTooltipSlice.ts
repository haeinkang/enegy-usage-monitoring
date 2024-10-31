import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GasUsageByLclgv, AirQualByLclgvNumeric } from '../types'
import { RootState } from './store';
import { find } from "lodash";

interface MapTooltipState {
  lclgvNm?: string
  gasData?: GasUsageByLclgv;
  airQualData?: AirQualByLclgvNumeric
}

const initialState: MapTooltipState = {}

const mapTooltipSlice = createSlice({
  name: 'mapTooltip', 
  initialState,
  reducers: {
    setGasData: (state, action) => {
      state.gasData = action.payload;
    },
    setAirQualData: (state, action) => {
      state.airQualData = action.payload;
    },
    
  },
})

export const { 
  setGasData, 
  setAirQualData,
} = mapTooltipSlice.actions;

export default mapTooltipSlice.reducer;

function getState(): RootState {
  throw new Error("Function not implemented.");
}

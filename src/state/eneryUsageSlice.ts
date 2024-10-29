import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  EnergyUsageByLclgv
} from '../types'
import { 
  getCtprvnRltmMesureDnsty, 
  fetchRegionMapping,
  fetchLclgvCoords,
  fetchSidoCoords,
} from '../services'
import _ from "lodash";

interface EnergyUsageState {
  data: EnergyUsageByLclgv[]
}

const initialState: EnergyUsageState = {
  data: []
}


const energyUsageSlice = createSlice({
  name: 'eneryUsage', 
  initialState,
  reducers: {

  }, 
  extraReducers: (builder) => {
  }
})

export const getEnergyUsage = createAsyncThunk(
  "eneryUsage/fetchEneryUsage", 
  async () => {
    
  }
)


export const { 
} = energyUsageSlice.actions;

export default energyUsageSlice.reducer;
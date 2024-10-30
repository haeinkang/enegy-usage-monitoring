import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GasUsageByLclgv } from '../types'
import { getGas, getElec } from '../services'
import _, { maxBy, orderBy } from "lodash";
import { RootState } from './store';

interface GasUsageState {
  data: GasUsageByLclgv[];
  selected?: GasUsageByLclgv;
  max?: GasUsageByLclgv;
}

const initialState: GasUsageState = {
  data: [],
}

const gasUsageSlice = createSlice({
  name: 'gasUsage', 
  initialState,
  reducers: {
    select: (state, action) => {
      state.selected = action.payload;
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(
      getGasUsage.pending, 
      () => {
        console.log('fetchGasUsage.pending')
      }
    );
    builder.addCase(
      getGasUsage.fulfilled,
      (state, action) => {
        state.data = orderBy(action.payload, ['gas'], ['desc']);
        state.max = maxBy(action.payload, 'avgUseQnt')
      }
    )
  }
})

export const getGasUsage = createAsyncThunk(
  "gasUsage/fetchGasUsage", 
  async (undefined, { getState }) => {
    const res = await getGas();
    const state = getState() as RootState;
    const lclgvCoords = state.coordSlice.lclgvCoords;

    const gasData = _(res)
      .map((item) => ({
        ...item, 
        coord: lclgvCoords[item.lclgvNm] 
      }))
      .orderBy('avgUseQnt', 'desc')
      .value()
    
    return gasData
  }
)

export const { 
  select,
} = gasUsageSlice.actions;

export default gasUsageSlice.reducer;
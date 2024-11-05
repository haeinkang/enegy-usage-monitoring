import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GasUsageByLclgv } from '../types'
import { getGas } from '../services'
import _, { find, maxBy, orderBy } from "lodash";
import { RootState } from './store';
import { fetchLclgvCoords } from '../services'

interface GasUsageState {
  loaded: boolean;
  data: GasUsageByLclgv[];
  error: string | null;
  selected?: GasUsageByLclgv;
  max?: GasUsageByLclgv;
}

const initialState: GasUsageState = {
  data: [],
  error: null,
  loaded: false,
}

const gasUsageSlice = createSlice({
  name: 'gasUsage', 
  initialState,
  reducers: {
    selectGasUsage: (state, action) => {
      const selected = find(state.data, o => o.lclgvNm === action.payload)
      state.selected = selected;
      state.error = null;
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(
      getGasUsage.fulfilled,
      (state, action) => {
        state.data = orderBy(action.payload, ['gas'], ['desc']);
        state.max = maxBy(action.payload, 'avgUseQnt');
        state.loaded = true;
      }
    )
    builder.addCase(
      getGasUsage.rejected,
      (state, payload) => {
        console.error('getGasUsage.rejected', payload.error)
        state.error = `${payload.error.code}: ${payload.error.message}`
        state.loaded = true;
      }
    )
  }
})

export const getGasUsage = createAsyncThunk(
  "gasUsage/fetchGasUsage", 
  async () => {
    try {
      const res = await getGas();
      const lclgvCoords = await fetchLclgvCoords();

      const gasData = _(res)
        .map((item) => ({
          ...item, 
          coord: lclgvCoords[item.lclgvNm] 
        }))
        .orderBy('avgUseQnt', 'desc')
        .value()
    
      return gasData

    } catch(e) {
      throw e;
    }
  }
)

export const { 
  selectGasUsage,
} = gasUsageSlice.actions;

export default gasUsageSlice.reducer;
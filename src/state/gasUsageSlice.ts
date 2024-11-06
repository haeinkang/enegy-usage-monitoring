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
  max?: GasUsageByLclgv;
  hoveredItem?: GasUsageByLclgv;
  clickedItem?: GasUsageByLclgv;
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
    hover: (state, action) => {
      state.hoveredItem = find(state.data, o => o.lclgvNm === action.payload);
      state.error = null;
    }, 
    click: (state, action) => {
      state.clickedItem = action.payload;
      state.error = null;
    }, 
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
        .filter(o => o.rlvtYr === "2021")
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
  hover,
  click,
} = gasUsageSlice.actions;

export default gasUsageSlice.reducer;
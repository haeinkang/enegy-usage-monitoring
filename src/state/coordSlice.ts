import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  RegionMapping, LclgvCoords, } from '../types'
import { 
  fetchRegionMapping,
  fetchLclgvCoords,
  fetchSidoCoords,
} from '../services'

interface CoordState {
  regionMapping: RegionMapping;
  lclgvCoords: LclgvCoords;
  sidoCoords: LclgvCoords;
}

const initialState: CoordState = {
  regionMapping: {},
  lclgvCoords: {}, 
  sidoCoords: {},
}


const coordSlice = createSlice({
  name: 'coord', 
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(
      getCoordJson.fulfilled, 
      (state, action) => {
        state.regionMapping = action.payload.regionMapping;
        state.lclgvCoords = action.payload.lclgvCoords;
        state.sidoCoords = action.payload.sidoCoords;
      }
    );
  }
})

export const getCoordJson = createAsyncThunk(
  "coord/getCoordJson", 
  async () => {
    const [regionMapping, lclgvCoords, sidoCoords] = await Promise.all([
      fetchRegionMapping(), 
      fetchLclgvCoords(), 
      fetchSidoCoords()
    ]);

    return { regionMapping, lclgvCoords, sidoCoords };
  }
)

export default coordSlice.reducer;
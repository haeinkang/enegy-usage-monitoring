import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LeftPanelState {
  isCollapsed: boolean;
}

const initialState: LeftPanelState = {
  isCollapsed: false,
}

const leftPanelSlice = createSlice({
  name: 'leftPanel', 
  initialState,
  reducers: {
    clickCollapseBtn: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
})

export const { 
  clickCollapseBtn,
} = leftPanelSlice.actions;

export default leftPanelSlice.reducer;
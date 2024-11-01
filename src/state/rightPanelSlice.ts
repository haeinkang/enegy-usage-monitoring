import { createSlice } from "@reduxjs/toolkit";

interface RightPanelState {
  isCollapsed: boolean;
}

const initialState: RightPanelState = {
  isCollapsed: true,
}

const rightPanelSlice = createSlice({
  name: 'rightPanel', 
  initialState,
  reducers: {
    clickCollapseBtn: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
})

export const { 
  clickCollapseBtn,
} = rightPanelSlice.actions;

export default rightPanelSlice.reducer;
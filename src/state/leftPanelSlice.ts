import { createSlice } from "@reduxjs/toolkit";

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
    open: (state) => {
      state.isCollapsed = false;
    },
    close: (state) => {
      state.isCollapsed = true;
    },
  },
})

export const { 
  clickCollapseBtn,
  open, 
  close,
} = leftPanelSlice.actions;

export default leftPanelSlice.reducer;
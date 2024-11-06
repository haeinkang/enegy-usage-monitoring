import { createSlice } from "@reduxjs/toolkit";
import { selectLclgvNm } from "./airQualSlice";

interface LeftPanelState {
  isCollapsed: boolean;
  selectedRegions: string[];
}

const initialState: LeftPanelState = {
  isCollapsed: false,
  selectedRegions: [],
}

const leftPanelSlice = createSlice({
  name: 'leftPanel', 
  initialState,
  reducers: {
    clickCollapseBtn: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    openLeftPanel: (state) => {
      state.isCollapsed = false;
    },
    closeLeftPanel: (state) => {
      state.isCollapsed = true;
    },
    selectRegions: (state, action) => {
      state.selectedRegions = action.payload;
    },
  },
})

export const { 
  clickCollapseBtn,
  openLeftPanel, 
  closeLeftPanel,
  selectRegions,
} = leftPanelSlice.actions;

export default leftPanelSlice.reducer;
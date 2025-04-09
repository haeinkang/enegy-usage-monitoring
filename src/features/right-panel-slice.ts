import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// 1. 상태 타입 정의
interface RightPanelState {
  isCollapsed: boolean;
}

// 2. 초기 상태
const initialState: RightPanelState = {
  isCollapsed: true,
};

// 3. slice 생성
const rightPanelSlice = createSlice({
  name: "rightPanel",
  initialState,
  reducers: {
    // 패널 토글 액션
    clickCollapseBtn: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

// 4. 액션과 리듀서 export
export const { clickCollapseBtn } = rightPanelSlice.actions;
export default rightPanelSlice.reducer;

// 5. selector export
export const selectIsCollapsed = (state: RootState) =>
  state.rightPanel.isCollapsed;

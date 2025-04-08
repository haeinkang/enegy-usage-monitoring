import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gasReducer from "../features/gas-slice";
import rightPanelReducer from "../features/right-panel-slice";
import airQualReducer from "../state/airQualSlice";
import leftPanelReducer from "../state/leftPanelSlice";
import mapTooltipReducer from "../state/MapTooltipSlice";
import gasUsageReducer from "../state/gasUsageSlice";

/**
 * 1. 루트 리듀서 구성
 * - 다른 슬라이스가 있다면 combineReducers로 합칩니다.
 */
const rootReducer = combineReducers({
  gas: gasReducer,
  gasUsage: gasUsageReducer,
  airQual: airQualReducer,
  leftPanel: leftPanelReducer,
  rightPanel: rightPanelReducer,
  mapTooltip: mapTooltipReducer,
});

/**
 * 2. 스토어 설정
 */
export const store = configureStore({
  reducer: rootReducer,
});

// 스토어 자체에서 상태 타입과 dispatch 타입을 유추함
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

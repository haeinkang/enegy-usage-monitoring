import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import airQualSlice from './airQualSlice'
import gasUsageSlice from './gasUsageSlice';
import leftPanelSlice from './leftPanelSlice';
import rightPanelSlice from './rightPanelSlice';
import coordSlice from './coordSlice';
import mapTooltipSlice from './MapTooltipSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    coordSlice: coordSlice,
    airQual: airQualSlice,
    gasUsage: gasUsageSlice,
    leftPanel: leftPanelSlice,
    rightPanel: rightPanelSlice,
    mapTooltip: mapTooltipSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
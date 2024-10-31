import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import airQualSlice from './airQualSlice'
import gasUsageSlice from './gasUsageSlice';
import leftPanelSlice from './leftPanelSlice';
import coordSlice from './coordSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    coordSlice: coordSlice,
    airQual: airQualSlice,
    gasUsage: gasUsageSlice,
    leftPanel: leftPanelSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
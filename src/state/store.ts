import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import airQualSlice from './airQualSlice'
import eneryUsageSlice from './eneryUsageSlice';
import coordSlice from './coordSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    coordSlice: coordSlice,
    airQual: airQualSlice,
    energyUsage: eneryUsageSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
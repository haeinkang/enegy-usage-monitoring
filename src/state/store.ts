import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import airQualSlice from './airQualSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    airQual: airQualSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
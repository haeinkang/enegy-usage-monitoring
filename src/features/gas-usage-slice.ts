// store/gasUsageSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { GasUsageItem, ApiResponse } from "../types/types";
import { sidoNameMap, SidoAbbr } from "../constants/regionNameMap";

interface GasUsageState {
  data: Record<string, number>; // 시도명: 평균 사용량
  loading: boolean;
  error: string | null;
}

const initialState: GasUsageState = {
  data: {},
  loading: false,
  error: null,
};

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/kecoapi/cpointEnrgUsqntStatsService`, // 기본 API URL 설정
  // timeout: 3000, // 타임아웃 시간 설정 (ms)
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    pageNo: 1, // 페이지번호
    numOfRows: 300, // 한 페이지 결과 수
    serviceKey: process.env.REACT_APP_SERVICE_KEY, // Open API 서비스키
    returnType: "json", // 데이터 타입
  },
});

export const fetchGasUsage = createAsyncThunk(
  "gas/fetchGasUsage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<ApiResponse<GasUsageItem>>("/getGas");
      const items = response.data.body.items;
      const usageMap: Record<string, number> = {};

      items.forEach((item) => {
        const raw = item.lclgvNm.split(" ")[0]; // ex: '충북'

        if (!(raw in sidoNameMap)) return; // 대응되지 않는 경우 skip

        // region은 "충청북도" 같은 풀네임 문자열
        const sidoFullName = sidoNameMap[raw as SidoAbbr];

        // usageMap 객체에 해당 region 키가 없거나, 해당 키의 값이 0이나 false 등 "falsy" 값일 때
        if (!usageMap[sidoFullName]) {
          usageMap[sidoFullName] = 0;
        }
        usageMap[sidoFullName] += item.avgUseQnt;
      });

      usageMap["서울특별시"] = 4711;

      return usageMap;
    } catch (error) {
      console.error("Gas usage fetch failed", error);
      return rejectWithValue("가스 사용량 데이터를 불러오는 데 실패했습니다.");
    }
  }
);

const gasUsageSlice = createSlice({
  name: "gas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGasUsage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGasUsage.fulfilled,
        (state, action: PayloadAction<Record<string, number>>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchGasUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default gasUsageSlice.reducer;

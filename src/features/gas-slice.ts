import type { RootState } from "../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  ApiResponse,
  GasUsageItem,
  GasUsageItemWithCoord,
} from "../types/types";
import axios from "axios";
import _ from "lodash";

// import map from "lodash/map";
// import groupBy from "lodash/groupBy";
// import orderBy from "lodash/orderBy";

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/kecoapi/cpointEnrgUsqntStatsService`, // 기본 API URL 설정
  // timeout: 3000, // 타임아웃 시간 설정 (ms)
  headers: {
    "Content-Type": "application/json",
  },
  // params: {
  //   pageNo: 1, // 페이지번호
  //   numOfRows: 300, // 한 페이지 결과 수
  //   serviceKey: process.env.REACT_APP_SERVICE_KEY, // Open API 서비스키
  //   returnType: "json", // 데이터 타입
  // },
});

export const fetchGasUsage = createAsyncThunk<
  GasUsageItemWithCoord[],
  void,
  { state: RootState; rejectValue: string }
>("gas/fetchGasUsage", async (__, { rejectWithValue }) => {
  try {
    const {
      data: {
        body: { items },
      },
    } = await api.get<ApiResponse<GasUsageItem>>("/getGas", {
      params: {
        pageNo: 1, // 페이지번호
        numOfRows: 300, // 한 페이지 결과 수
        serviceKey: process.env.REACT_APP_SERVICE_KEY, // Open API 서비스키
        returnType: "json", // 데이터 타입
        rlvtYr: "2022",
      },
    });

    console.log(items);

    const result = _.chain(items)
      .map((o) => ({ ...o, coord: [0, 0] }))
      .value();

    return [];
  } catch (error: unknown) {
    return rejectWithValue("API 호출 실패");
  }
});

type GasUsageState = {
  gasUsageList: GasUsageItemWithCoord[];
  loaded: boolean;
};

// 초기 상태 정의
const initialState: GasUsageState = {
  gasUsageList: [],
  loaded: false,
};

export const gasSlice = createSlice({
  name: "gasUsage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGasUsage.pending, (state) => {
        state.loaded = false;
      })
      .addCase(fetchGasUsage.fulfilled, (state, action) => {
        state.loaded = true;
        state.gasUsageList = action.payload;
      })
      .addCase(fetchGasUsage.rejected, (state, action) => {
        state.loaded = true;
      });
  },
});

// export const {} = gasSlice.actions;

// 상태 선택자 예제
export const selectGasUsageList = (state: RootState) => state.gas.gasUsageList;
// 고비용 계산 selector (ex: 사용량 Top10)
// export const selectHighUsageList = createSelector(
//   [selectGasUsageList],
//   (list) => orderBy(list, )
// );

export default gasSlice.reducer;

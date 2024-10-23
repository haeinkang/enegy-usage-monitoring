import React, { useEffect } from 'react';
import * as api from '../../services'
import EchartsExtGmap from './EchartsExtGmap'
import GmapChart from './GmapChart'
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import type { CSSProperties } from "react";

const geoCoordMap = {
  "강원 강릉시": [37.751853, 128.876057],
  "강원 고성군": [38.380719, 128.46796],
  "강원 동해시": [37.524719, 129.11427],
  "강원 삼척시": [37.449828, 129.165827],
  "강원 속초시": [38.207021, 128.591848],
  "강원 양구군": [38.110824, 127.9898],
  "강원 양양군": [38.07522, 128.619577],
} 
export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
}

const option: ReactEChartsProps["option"] = {
  dataset: {
    source: [
      ["Commodity", "Owned", "Financed"],
      ["Commodity 1", 4, 1],
      ["Commodity 2", 2, 4],
      ["Commodity 3", 3, 6],
      ["Commodity 4", 5, 3],
      ["Commodity 5", 5, 3],
      ["Commodity 6", 5, 3],
      ["Commodity 7", 5, 3],
      ["Commodity 8", 5, 3],
      ["Commodity 9", 5, 3],
      ["Commodity 10", 5, 3],
    ],
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["Owned", "Financed"],
  },
  grid: {
    left: "10%",
    right: "0%",
    top: "20%",
    bottom: "20%",
  },
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
  },
  series: [
    {
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
    },
    {
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
    },
  ],
}

function EneryUsageMonitoring() {

  useEffect(() => {
    getGas();
    getWtspl();
    getElec();
  }, [])

  const getGas = async () => {
    try {
      const res = await api.getGas({
        pageNo: 1, // 페이지번호
        numOfRows: 191, // 한 페이지 결과 수     
      })
  
    } catch (error) {
      console.error(error);
    }
  }

  const getWtspl = async () => {
    try {
      const res = await api.getWtspl({
        pageNo: 1, // 페이지번호
        numOfRows: 205, // 한 페이지 결과 수     
      })
  
    } catch (error) {
      console.error(error);
    }
  }
  const getElec = async () => {
    try {
      const res = await api.getElec({
        pageNo: 1, // 페이지번호
        numOfRows: 208, // 한 페이지 결과 수     
      })
  
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ width: '100%', height: '80vh'}}>
      <EchartsExtGmap />
      {/* <GmapChart /> */}
    </div>
  );
}

export default EneryUsageMonitoring;
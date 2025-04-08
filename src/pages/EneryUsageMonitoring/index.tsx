import React, { useCallback, useEffect, useRef } from "react";
import MapChart from "./MapChart";
import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../state/store";
import { AppDispatch } from "../../app/store";
import { getGasUsage } from "../../state/gasUsageSlice";
import { getAirQualData } from "../../state/airQualSlice";
import { fetchGasUsage } from "../../features/gas-usage-slice";
import Map from "./Map";
import sidoGeoJson from "./SIDO_MAP_2022.json"; // json import

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    initData();
  }, []);

  const initData = useCallback(async () => {
    // dispatch(getGasUsage());
    // dispatch(getAirQualData());

    dispatch(fetchGasUsage());
  }, [dispatch]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <MapChart /> */}
      <Map />;
    </div>
  );
}

export default EneryUsageMonitoring;

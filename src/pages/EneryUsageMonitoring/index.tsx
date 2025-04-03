import React, { useCallback, useEffect, useRef } from "react";
import MapChart from "./MapChart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { getGasUsage } from "../../state/gasUsageSlice";

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    initData();
  }, []);

  const initData = useCallback(async () => {
    dispatch(getGasUsage());
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapChart />
    </div>
  );
}

export default EneryUsageMonitoring;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchGasUsage } from "../../features/gas-usage-slice";
import Map from "./Map";

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGasUsage());
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map />
    </div>
  );
}

export default EneryUsageMonitoring;

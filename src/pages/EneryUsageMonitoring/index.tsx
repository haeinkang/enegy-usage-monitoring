import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchGasUsage } from "../../features/gas-usage-slice";
import Map from "./Map";
import LeftPanel from "../../components/LeftPanel";

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGasUsage());
  }, []);

  return (
    <div className="h-full w-full relative">
      <Map />
      <LeftPanel />
    </div>
  );
}

export default EneryUsageMonitoring;

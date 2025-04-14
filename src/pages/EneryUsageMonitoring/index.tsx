import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchGasUsage } from "../../features/gas-usage-slice";
import Map from "./Map";
import LeftPanel from "../../components/LeftPanel";
import { SidoFullName } from "../../constants/regionNameMap";

function EneryUsageMonitoring() {
  const dispatch = useDispatch<AppDispatch>();
  const [sido, setSido] = useState<SidoFullName>();

  useEffect(() => {
    dispatch(fetchGasUsage());
  }, [dispatch]);

  return (
    <div className="h-full w-full relative">
      <Map setSido={setSido} />
      <LeftPanel setSido={setSido} sido={sido} />
    </div>
  );
}

export default EneryUsageMonitoring;

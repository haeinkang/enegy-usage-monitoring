import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchGasUsage } from "../../features/gas-usage-slice";
import Map from "./Map";
import LeftPanel from "../../components/LeftPanel";
import { SidoFullName } from "../../constants/regionNameMap";
import LogoWithText from "../../components/icons/LogoWithText";

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
      <div
        className="
          absolute w-full top-0 left-0 right-0
          gap-2 
          flex items-center bg-gradient-to-b to-transparent 
          px-2 p-4 
          z-20
          translate-y-0
          sm:-translate-y-full
        "
      >
        <LogoWithText />
      </div>
    </div>
  );
}

export default EneryUsageMonitoring;

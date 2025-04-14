import { useRef, useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useAppSelector } from "../../app/hooks";
import GeoJson from "./geoJSON.json";
import mapStyles from "./mapStyles.json";
import max from "lodash/max";
import LoadingIndicator from "../../components/LoadingIndicator";
import { SidoFullName, sidoNameMap } from "../../constants/regionNameMap";

interface MapProps {
  setSido: React.Dispatch<React.SetStateAction<SidoFullName | undefined>>;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 36.5,
  lng: 127.5,
};

function getColorByUsage(usage: number, maxUsage: number): string {
  const ratio = usage / maxUsage;
  const r = 255;
  const g = Math.round(255 * Math.pow(1 - ratio, 2));
  const b = Math.round(255 * Math.pow(1 - ratio, 2));
  return `rgba(${r},${g},${b}, 1)`;
}

const Map = (props: MapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const gasUsage = useAppSelector((state) => state.gas.data);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const maxUsage = useMemo(() => max(Object.values(gasUsage)) ?? 1, [gasUsage]);

  const renderGeoJson = (map: google.maps.Map) => {
    const geoJsonLayer = new window.google.maps.Data();
    geoJsonLayer.addGeoJson(GeoJson);
    geoJsonLayer.setMap(map);

    geoJsonLayer.setStyle((feature) => {
      const provinceName = feature.getProperty("CTP_KOR_NM");

      if (typeof provinceName === "string") {
        const usage = gasUsage[provinceName] ?? 0;
        const fillColor = getColorByUsage(usage, maxUsage);

        return {
          fillColor,
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 1,
        };
      }

      // fallback style
      return {
        fillColor: "#FFFfff0",
        fillOpacity: 0,
        strokeColor: "#ccc",
        strokeWeight: 1,
      };
    });

    // 👉 클릭 이벤트 핸들러 등록
    geoJsonLayer.addListener("click", (event: google.maps.Data.MouseEvent) => {
      const feature = event.feature;
      const provinceName = feature.getProperty("CTP_KOR_NM") as SidoFullName;

      console.log(provinceName);
      props.setSido(provinceName);
    });
  };

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    renderGeoJson(map);
  };

  if (!isLoaded) return <LoadingIndicator />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={{ styles: mapStyles }}
      center={center}
      zoom={7}
      onLoad={handleMapLoad}
    />
  );
};

export default Map;

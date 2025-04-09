import { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useAppSelector } from "../../app/hooks";
import koreaGeoJson from "./SIDO_MAP.json";
import max from "lodash/max";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 36.5,
  lng: 127.5,
};

// 색상 계산 함수 (빨강 계열)
function getColorByUsage(usage: number, maxUsage: number): string {
  const ratio = usage / maxUsage;
  const r = 255;
  const g = Math.round(255 * Math.pow(1 - ratio, 2));
  const b = Math.round(255 * Math.pow(1 - ratio, 2));

  return `rgba(${r},${g},${b}, 1)`;
}

const Map = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const gasUsage = useAppSelector((state) => state.gas.data);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY ??
      (() => {
        throw new Error("Missing Google Maps API key");
      })(),
  });

  // 최대값 계산
  const maxUsage = max(Object.values(gasUsage)) ?? 1; //

  if (!isLoaded) return <div>지도를 불러오는 중입니다...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={(mapInstance: google.maps.Map) => {
        mapRef.current = mapInstance;

        const geoJsonLayer = new google.maps.Data();
        geoJsonLayer.addGeoJson(koreaGeoJson);
        geoJsonLayer.setMap(mapInstance);

        geoJsonLayer.setStyle((feature) => {
          const provinceName = feature.getProperty("CTP_KOR_NM");
          if (typeof provinceName === "string") {
            const usage = gasUsage[provinceName];
            const fillColor = getColorByUsage(usage, maxUsage);

            return {
              fillColor,
              fillOpacity: 0.7,
              strokeColor: "#fff",
              strokeWeight: 1,
            };
          } else {
            // name이 string이 아닐 경우 처리 (예: 기본값 사용)
            return {
              fillColor: "#FFF0",
            };
          }
        });
      }}
    />
  );
};

export default Map;

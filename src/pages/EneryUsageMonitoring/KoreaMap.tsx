// components/KoreaMap.tsx
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 36.5,
  lng: 127.5,
};

// 시도별 색상 매핑
const regionColors: Record<string, string> = {
  서울특별시: "#e41a1c",
  부산광역시: "#377eb8",
  대구광역시: "#4daf4a",
  인천광역시: "#984ea3",
  광주광역시: "#ff7f00",
  대전광역시: "#ffff33",
  울산광역시: "#a65628",
  세종특별자치시: "#f781bf",
  경기도: "#999999",
  강원특별자치도: "#66c2a5",
  충청북도: "#fc8d62",
  충청남도: "#8da0cb",
  전라북도: "#e78ac3",
  전라남도: "#a6d854",
  경상북도: "#ffd92f",
  경상남도: "#e5c494",
  제주특별자치도: "#b3b3b3",
};

export default function KoreaMap({ geoJson }: { geoJson: any }) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    map.data.addGeoJson(geoJson);

    map.data.setStyle((feature) => {
      const name = feature.getProperty("CTP_KOR_NM");
      if (typeof name === "string" && name in regionColors) {
        return {
          fillColor: regionColors[name],
          strokeColor: "#555",
          strokeWeight: 1,
          fillOpacity: 0.7,
        };
      }

      return {
        fillColor: "#cccccc",
        strokeColor: "#555",
        strokeWeight: 1,
        fillOpacity: 0.7,
      };
    });

    map.data.addListener("mouseover", (event: any) => {
      map.data.overrideStyle(event.feature, { fillOpacity: 1.0 });
    });

    map.data.addListener("mouseout", (event: any) => {
      map.data.revertStyle();
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
      />
    </LoadScript>
  );
}

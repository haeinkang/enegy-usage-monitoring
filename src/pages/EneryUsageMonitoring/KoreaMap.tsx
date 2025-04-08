// components/KoreaMap.tsx
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 36.5,
  lng: 127.5,
};

export default function KoreaMap({ geoJson }: { geoJson: any }) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    map.data.addGeoJson(geoJson);
    map.data.setStyle({
      fillColor: "#FFEDA0",
      strokeColor: "#555",
      strokeWeight: 1,
      fillOpacity: 0.6,
    });

    map.data.addListener("mouseover", (event: any) => {
      map.data.overrideStyle(event.feature, { fillColor: "#FEB24C" });
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

import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
const GOOGLE_API_KEY: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''

function GmapChart() {
  return (
    <APIProvider apiKey={GOOGLE_API_KEY}>
      <Map
        mapId={'739af084373f96fe'}
        defaultCenter={{lat: 35.9078, lng: 127.7669}}
        defaultZoom={7}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        style={{width: '100%', height: '100%'}}
      />

    </APIProvider>
  );
}

export default GmapChart;

var geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "Q28163226",
      "geometry": {
        "type": "Point",
        "coordinates": [126.9971, 37.5503]
      },
      "properties": {
        "name": "Castillo Brunet",
        "wikipedia": "en:Brunet Castle",
        "wikidata": "Q28163226"
      }
    },
    {
      "type": "Feature",
      "id": "Q16490485",
      "geometry": {
        "type": "Point",
        "coordinates": [127.4681, 37.4143]
      },
      "properties": {
        "name": "Castillo de Guachala",
        "wikipedia": "es:Castillo de Guachalá",
        "wikidata": "Q16490485"
      }
    }
  ]
}

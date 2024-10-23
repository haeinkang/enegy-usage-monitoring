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

var trees = [
  {
    "name": "Ash, green",
    "category": "ash",
    "position": {
      "lat": 127.4681,
      "lng": 37.4143
    }
  }
]
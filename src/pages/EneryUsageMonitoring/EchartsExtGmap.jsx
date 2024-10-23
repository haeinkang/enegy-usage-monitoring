import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import gmapStyling from '../../assets/gamp_styling.json'

const EchartsExtGmap = () => {
  const chartRef = useRef(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    // Google Maps API가 로드되었는지 확인하는 함수
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        setGoogleLoaded(true); // Google Maps가 로드되었으면 상태 업데이트
      } else {
        setTimeout(checkGoogleMapsLoaded, 100); // 로드되지 않았다면 100ms 후에 다시 체크
      }
    };

    // 초기 Google Maps 로드 확인
    checkGoogleMapsLoaded();
  }, []);

  useEffect(() => {
    if (googleLoaded && chartRef.current) {
      // ECharts 인스턴스 생성
      const chart = echarts.init(chartRef.current);

      // ECharts 옵션 설정
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item'
        },
        gmap: {
          mapId: '739af084373f96fe',
          center: [127.7669, 35.9078],
          zoom: 7,
          renderOnMoving: true,
          echartsLayerZIndex: 2019,
          roam: true,
          styles: [
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#004358'}]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry',
              stylers: [{color: '#1f8a70'}]
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [{color: '#1f8a70'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#fd7400'}]
            },
            {
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [{color: '#1f8a70'}, {lightness: -20}]
            },
            {
              featureType: 'road.local',
              elementType: 'geometry',
              stylers: [{color: '#1f8a70'}, {lightness: -17}]
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [{color: '#ffffff'}, {visibility: 'on'}, {weight: 0.9}]
            },
            {
              elementType: 'labels.text.fill',
              stylers: [{visibility: 'on'}, {color: '#ffffff'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{visibility: 'simplified'}]
            },
            {elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#1f8a70'}, {lightness: -10}]
            },
            {},
            {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [{color: '#1f8a70'}, {weight: 0.7}]
            }
          ] 
          
        },
        series: [
          {
            name: '전기',
            type: 'scatter',
            coordinateSystem: 'gmap',
            data: [
              [128.8991, 37.7563, 46],
              [127.1891, 37.2362, 120],
              [126.6313, 37.4752, 146],
              [129.0714, 35.1731, 218],
              [126.9971, 37.5503, 245], 
              [126.5662, 33.3786, 553],
              [128.3509, 36.1172, 899],
            ],
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'gmap',
            data: [
              [126.6313, 37.4752, 146],
              [129.0714, 35.1731, 218],
              [126.9971, 37.5503, 245], 
              [126.5662, 33.3786, 553],
              [128.3509, 36.1172, 899],
            ],
            symbolSize: function (val) {
              return val[2] / 10;
            },
            encode: {
              value: 2
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              color: '#FF6F61',
              shadowBlur: 30,
              shadowColor: '#FF6F61'
            },
            emphasis: {
              scale: true
            },
            zlevel: 1
          }
        ],
      };

      // 옵션을 적용하여 차트 생성
      chart.setOption(option);

    }
  }, [googleLoaded]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default EchartsExtGmap;

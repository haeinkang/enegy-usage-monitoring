import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import { slice } from 'lodash'

const EchartsExtGmap = ({ data, pm10Data }) => {
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
      // 이미 초기화된 차트 인스턴스가 있는지 확인하고 삭제
      if (echarts.getInstanceByDom(chartRef.current)) {
        echarts.dispose(chartRef.current);
      }


      // ECharts 인스턴스 생성
      const chart = echarts.init(chartRef.current);

      

      fetch('../../법정구역_시도_simplified.geojson') // GeoJSON 파일 경로를 여기에 넣으세요
        .then(response => response.json())


      // ECharts 옵션 설정
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item'
        },
        gmap: {
          mapId: '739af084373f96fe',
          center: [127.7669, 35.9078],
          zoom: 7.4,
          renderOnMoving: true,
          echartsLayerZIndex: 2019,
          roam: true,
          // styles: [
          //   {
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "color": "#242f3e"
          //       }
          //     ]
          //   },
          //   {
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#746855"
          //       }
          //     ]
          //   },
          //   {
          //     "elementType": "labels.text.stroke",
          //     "stylers": [
          //       {
          //         "color": "#242f3e"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "administrative",
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "administrative.land_parcel",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "administrative.locality",
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#d59563"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "administrative.neighborhood",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "poi",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "poi",
          //     "elementType": "labels.text",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "poi",
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#d59563"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "poi.park",
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "color": "#263c3f"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "poi.park",
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#6b9a76"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road",
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "color": "#38414e"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road",
          //     "elementType": "geometry.stroke",
          //     "stylers": [
          //       {
          //         "color": "#212a37"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road",
          //     "elementType": "labels",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road",
          //     "elementType": "labels.icon",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road",
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#9ca5b3"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.arterial",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.highway",
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "color": "#746855"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.highway",
          //     "elementType": "geometry.stroke",
          //     "stylers": [
          //       {
          //         "color": "#1f2835"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.highway",
          //     "elementType": "labels",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.highway",
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#f3d19c"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "road.local",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "transit",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "transit",
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "color": "#2f3948"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "transit.station",
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#d59563"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "water",
          //     "elementType": "geometry",
          //     "stylers": [
          //       {
          //         "color": "#17263c"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "water",
          //     "elementType": "labels.text",
          //     "stylers": [
          //       {
          //         "visibility": "off"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "water",
          //     "elementType": "labels.text.fill",
          //     "stylers": [
          //       {
          //         "color": "#515c6d"
          //       }
          //     ]
          //   },
          //   {
          //     "featureType": "water",
          //     "elementType": "labels.text.stroke",
          //     "stylers": [
          //       {
          //         "color": "#17263c"
          //       }
          //     ]
          //   }
          // ]
          
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 300,
          seriesIndex: 2,
          calculable: true,
          inRange: {
            color: ['blue', 'green', 'yellow', 'orange', 'red']
          }
        },
        series: [
          {
            name: '가스 평균 사용량',
            type: 'scatter',
            coordinateSystem: 'gmap',
            data,
            symbolSize: function (val) {
              return val[2] / 8;
            },
            encode: {
              value: 2
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            itemStyle: {
              color: '#98FF98',
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: 'Top 10',
            type: 'effectScatter',
            coordinateSystem: 'gmap',
            data: slice(data, 0, 10),
            symbolSize: function (val) {
              return val[2] / 8;
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
              color: '#FF5733',
              shadowBlur: 30,
              shadowColor: '#FF2400'
            },
            emphasis: {
              scale: true
            },
            zlevel: 1
          }, 
          {
            type: 'heatmap',
            coordinateSystem: 'gmap',
            data: pm10Data, // [ [경도, 위도, 1], ... ]
            pointSize: 30,
            blurSize: 0
          }
        ],
      };

      // 옵션을 적용하여 차트 생성
      chart.setOption(option);

    }
  }, [googleLoaded, data, pm10Data]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default EchartsExtGmap;


// /** 위도 경도 값 구하기 */
  // const fetchCoordinates = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${'충남 서천군'}&key=${GOOGLE_API_KEY}`
  //     );

  //     console.log(response)
      
  //   } catch (error) {
  //   }
    
  // };
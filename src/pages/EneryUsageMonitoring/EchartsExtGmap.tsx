import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import _, { slice, map } from 'lodash'
import { GeoCoord, EchartMapData, GeoCoordVal } from '../../types'
import BoltIcon from '@mui/icons-material/Bolt';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { mapToStyles } from '@popperjs/core/lib/modifiers/computeStyles';

const EchartsExtGmap = () => {
  // const airQualData = useSelector((state: RootState) => state.airQual.data);
  const gasUsage = useSelector((state: RootState) => state.gasUsage.data);

  const chartRef = useRef(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [heatmapData, setHeatmapData] = useState<EchartMapData[]>([])
  const [scatterData, setScatterData] = useState<EchartMapData[]>([])
  const [top10Data, setTop10Data] = useState<EchartMapData[]>([])

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
    // const heatmapData = map(airQualData, o => {
    //   const coord: GeoCoord = Array.isArray(o.coord) ? o.coord : [0, 0];
    //   return { 
    //     name: o.lclgvNm, 
    //     value: [...coord, o['pm10Value']] as GeoCoordVal 
    //   }
    // })

    const scatterData = _(gasUsage)
      .map((o) => {
        const coord: GeoCoord = Array.isArray(o.coord) ? o.coord : [0, 0];
        return {
          name: o.lclgvNm, 
          value: [...coord, o.avgUseQnt] as GeoCoordVal 
        }
      })
      .value() 
    
    // setHeatmapData(heatmapData)
    setScatterData(scatterData)
    setTop10Data(slice(scatterData, 0, 10))
    
  }, [gasUsage])

  useEffect(() => {
    if (googleLoaded && chartRef.current) {
      // 이미 초기화된 차트 인스턴스가 있는지 확인하고 삭제
      if (echarts.getInstanceByDom(chartRef.current)) {
        echarts.dispose(chartRef.current);
      }

      // ECharts 인스턴스 생성
      const chart = echarts.init(chartRef.current, 'dark');

      

      // ECharts 옵션 설정
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item'
        },
        gmap: {
          // mapId: '739af084373f96fe',
          center: [126.7669, 36.2178],
          zoom: 8,
          renderOnMoving: true,
          echartsLayerZIndex: 2019,
          roam: true,
          styles: gmapStyles
        },
        // visualMap: {
        //   show: false,
        //   top: 'top',
        //   min: 0,
        //   max: 500,
        //   seriesIndex: 0,
        //   calculable: true,
        //   inRange: {
        //     color: ['blue', 'green', 'yellow', 'orange', 'red']
        //   }
        // },
        series: [
          // {
          //   type: 'heatmap',
          //   coordinateSystem: 'gmap',
          //   data: [],
          //   pointSize: 55,
          //   blurSize: 1, 
          //   label: {
          //     formatter: '{b}',
          //     position: 'right',
          //     show: true
          //   },
          // },
          {
            name: '가스 사용량',
            type: 'scatter',
            coordinateSystem: 'gmap',
            data: scatterData,
            symbolSize: function (val: [...GeoCoord, number]) {
              return val[2] / 5;
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
              color: '#ddb926',
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          {
            name: '가스 사용량 Top 10',
            type: 'effectScatter',
            coordinateSystem: 'gmap',
            data: top10Data,
            symbolSize: function (val: [...GeoCoord, number]) {
              return val[2] / 5;
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
              color: '#c23531',
              shadowBlur: 30,
              shadowColor: '#c23531'
            },
            emphasis: {
              scale: true
            },
            zlevel: 1
          }, 
          // ...createPieSeries(),
        ],
      };

      // 옵션을 적용하여 차트 생성
      chart.setOption(option);

    }
  }, [googleLoaded, scatterData, top10Data]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default EchartsExtGmap;

const gmapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
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
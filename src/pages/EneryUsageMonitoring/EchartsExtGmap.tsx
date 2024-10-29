import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import _, { slice, map } from 'lodash'
import { EnergyUsageByLclgv, ConvertData, AirQualByLclgvNumeric, GeoCoord} from '../../types'
import BoltIcon from '@mui/icons-material/Bolt';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';

interface iProps {
  energyUsage: EnergyUsageByLclgv[];
}

const EchartsExtGmap = ({ energyUsage }: iProps) => {
  const airQualData = useSelector((state: RootState) => state.airQual.data);

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
      const chart = echarts.init(chartRef.current, 'dark');

      const heatmapData = map(airQualData, o => {
        const coord = Array.isArray(o.coord) ? o.coord : [0, 0];
        return { 
          name: o.lclgvNm, 
          value: [...coord, o['pm10Value']]
        }
      })
    

      // ECharts 옵션 설정
      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item'
        },
        gmap: {
          mapId: '739af084373f96fe',
          // center: [126.7594, 37.4237],
          center: [127.7669, 35.9078],
          zoom: 7.5,
          renderOnMoving: true,
          echartsLayerZIndex: 2019,
          roam: true,
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 500,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'green', 'yellow', 'orange', 'red']
          }
        },
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'gmap',
            data: heatmapData,
            pointSize: 55,
            blurSize: 1, 
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
          },
          {
            name: '에너지 평균 사용량',
            type: 'scatter',
            coordinateSystem: 'gmap',
            data: map(energyUsage, item => ({
              name: item.lclgvNm, 
              value: [...item.coord, item.gas]
            })),
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
              color: '#98FF98',
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
            // data: [],
            data: _(energyUsage)
              .orderBy('gas', 'desc')
              .slice(0, 5)
              .map(item => ({
                name: item.lclgvNm, 
                value: [...item.coord, item.gas]
              }))
              .value(),
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
              color: '#e01f54',
              shadowBlur: 30,
              shadowColor: '#e01f54'
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
  }, [googleLoaded, energyUsage, airQualData]);


  const createPieSeries = () => 
    map(energyUsage, item => ({
      name: item.lclgvNm,
      type: 'pie',
      coordinateSystem: 'gmap',
      /**
       * {a}시리즈 이름, {b}데이터 항목 이름, {c}데이터 값, {d}백분율.
       */
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {          
          const value = params.name === '가스' ? params.value / 39 : params.value / 3.6 ;
          const unit = params.name === '가스' ? 'm³' : 'kWh'      
          return `${params.seriesName} <br/>${params.name}: ${value} ${unit} (${params.percent}%)`;
        } 
      },
      label: {
        show: true,
        position: 'inner',
        fontSize: 14,
      },
      labelLine: {
        show: false
      },
      color: ['#e01f54', '#001852', '#f5e8c8'], 
      animationDuration: 0,
      radius: (item.gas + item.elec)/20,
      // radius: 25, 
      center: item.coord,
      data: [
        { name: '가스', value: item.gas * 39 },
        // { name: '물', value: item.water },
        { name: '전기', value: item.elec * 3.6 }
      ]
    }))
  

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
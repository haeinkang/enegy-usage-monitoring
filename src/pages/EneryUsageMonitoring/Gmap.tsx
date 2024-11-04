import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { GeoCoord, GeoCoordVal } from '../../types';
import { getGasUsageColor, calculateDistance } from '../../utils'
import { find, slice } from 'lodash';
import MapTooltip from './MapTooltip';
import ReactDOMServer from 'react-dom/server';
import { selectLclgvNm } from '../../state/airQualSlice';
import { selectGasUsage } from '../../state/gasUsageSlice';

const EChartsGMapComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gasUsageList = useSelector((state: RootState) => state.gasUsage.data);
  const airQualList = useSelector((state: RootState) => state.airQual.data);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const max = useSelector((state: RootState) => state.gasUsage.max);
  const selected = useSelector((state: RootState) => state.gasUsage.selected);

  /**
   * 새로운 ECharts 인스턴스 생성
   */
  const createEChart = () => {
    console.log('createEChart called')

    if(chartRef.current) {
      // 기존 ECharts 인스턴스 확인 및 제거
      let chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        chart.dispose();
      }
  
      // 새로운 ECharts 인스턴스 생성
      chart = echarts.init(chartRef.current);
  
      const option = {
        gmap: {
          mapId: '739af084373f96fe',
          center: [126.7669, 36.2178],
          zoom: 8,
          roam: true,
        }
      };
      chart.setOption(option);
    }
  }
  
  /**
   * 데이터를 Echart에 맞게 변환 
   */
  const convertData = () => {
    const data = gasUsageList.map((o) => {
      const coord: GeoCoord = Array.isArray(o.coord) ? o.coord : [0, 0];
      return {
        name: o.lclgvNm,
        value: [...coord, o.avgUseQnt] as GeoCoordVal,
      };
    });
    const top10Data = slice(data, 0, 10);

    return { data, top10Data };
  }

  useEffect(() => {
    if(!isMapLoaded) {
      const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      });

      loader
        .load()
        .then(() => {
          console.log('구글맵 로드 완료')

          if (chartRef.current) {
            console.log(chartRef.current)
            try {
              // 기존 ECharts 인스턴스 확인 및 제거
              let chart = echarts.getInstanceByDom(chartRef.current);
              if (chart) {
                chart.dispose();
              }
              createEChart();
              setIsMapLoaded(true);
            } catch (error) {
              console.error('ECharts 초기화 중 오류 발생:', error);
              // 사용자에게 오류 메시지 표시 또는 대체 동작 수행
            }
          }
        })
        .catch((error) => {
          console.error('Google Maps API 로드 중 오류 발생:', error);
          // 사용자에게 오류 메시지 표시 또는 대체 동작 수행
        });
    }

    return () => {
      if (chartRef.current) {
        const chart = echarts.getInstanceByDom(chartRef.current);
        if (chart) {
          chart.dispose();
        }
      }
    };
  }, []);

  const updateEChartData = () => {
    console.log('updateEChartData called')

    if (chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        const { data, top10Data } = convertData();

        // 클릭 이벤트 리스너 추가
        chart.on('click', (params) => {
          if (
            params.seriesType === 'scatter' 
            || params.seriesType === 'effectScatter'
          ) {
            dispatch(selectLclgvNm(params.name))
            dispatch(selectGasUsage(params.name))
          }
        });

        chart.setOption({
          tooltip: {
            trigger: 'item', 
            styles: { 
              backgroundColor: "#000",
            },
            formatter: (
              params: any, 
              ticket: string
            ) => {
              const gasData = find(gasUsageList, o => o.lclgvNm === params.name)    
              const airQualData = find(airQualList, o => o.lclgvNm === params.name)    
  
              // return ReactDOMServer.renderToString( <div>dddd</div>);
              return ReactDOMServer.renderToString(
                <MapTooltip 
                  gasUsageList={gasUsageList}
                  selectedGasData={gasData}
                  selectedAirQualData={airQualData}
                />
              );
  
            }
  
          },
          series: [
            {
              name: '가스 사용량',
              type: 'scatter',
              coordinateSystem: 'gmap',
              data: data,
              symbolSize: function (val: any) {
                return val[2] / 5; // 필요에 따라 조정
              },
              encode: {
                value: 2
              },
              label: {
                show: false
              },
              itemStyle: {
                color: function(item: any) {
                  return getGasUsageColor(max!.avgUseQnt, item.value[2]);
                }
              },
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
                show: false
              },
              itemStyle: {
                color: function(item: any) {
                  return getGasUsageColor(max!.avgUseQnt, item.value[2]);
                },
                shadowBlur: 30,
              },
              emphasis: {
                scale: true
              },
              zlevel: 1
            }, 
          ],
        });
        console.log('data 업데이트')
      } 
    }
  }

  const initializeAndUpdateChart = async () => {
    if (isMapLoaded && chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        updateEChartData();
        console.log('data 업데이트');
      } else {
        console.log('data 업데이트 error');
        createEChart();
        updateEChartData();
      }
    }
  };

  // 선택된 위치로 부드럽게 확대하는 함수
  const smoothZoomTo = (
    chart: echarts.ECharts, 
    coord: GeoCoord, 
    initialZoom: number, 
    finalZoom: number, 
    duration: number
  ) => {
    if (chart) {
      // 첫 번째 단계: zoom을 줄여서 잠깐 표시
      const initialZoomOption = {
        gmap: {
          center: coord,
          zoom: initialZoom,
        },
      };
      chart.setOption(initialZoomOption);

      // 두 번째 단계: zoom을 finalZoom으로 부드럽게 확대
      setTimeout(() => {
        const finalZoomOption = {
          gmap: {
            center: coord,
            zoom: finalZoom,
          },
        };
        chart.setOption(finalZoomOption);
      }, duration);
    }
  };


  useEffect(() => {
    initializeAndUpdateChart()
  }, [isMapLoaded, gasUsageList, convertData]);


   // 선택된 위치가 변경될 때마다 확대 실행
   useEffect(() => {
    if (selected && chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if(chart) {
        const gmap: any = chart.getOption().gmap
        const currentCenter = gmap[0].center;
        const distance = calculateDistance(currentCenter, selected.coord);
        const distanceThreshold = 70; // 거리 임계값 (단위: km)

        console.log({distance, distanceThreshold,})
  
        if (distance > distanceThreshold) {
          // 거리가 임계값보다 크면 줌 아웃 후 확대
          smoothZoomTo(chart, selected.coord, 8, 11, 500);
        } else {
          // 거리가 임계값 이하이면 바로 확대
          chart.setOption({
            gmap: {
              center: selected.coord,
              zoom: 11,
            },
          });
        }

      }
    }
  }, [selected]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
  )
};

export default EChartsGMapComponent;

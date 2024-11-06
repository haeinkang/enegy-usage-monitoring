import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { GeoCoord, GeoCoordVal } from '../../types';
import { getGasUsageColor, calculateDistance } from '../../utils'
import { map, find, slice } from 'lodash';
import MapTooltip from './MapTooltip';
import ReactDOMServer from 'react-dom/server';
import { selectLclgvNm } from '../../state/airQualSlice';
import { click } from '../../state/gasUsageSlice';
import { open } from '../../state/leftPanelSlice';

const MapChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gasDataLoaded = useSelector((state: RootState) => state.gasUsage.loaded);
  const gasUsageList = useSelector((state: RootState) => state.gasUsage.data);
  const hoveredItem = useSelector((state: RootState) => state.gasUsage.hoveredItem);
  const clickedItem = useSelector((state: RootState) => state.gasUsage.clickedItem);
  const max = useSelector((state: RootState) => state.gasUsage.max);

  const airDataLoaded = useSelector((state: RootState) => state.airQual.loaded);
  const airQualList = useSelector((state: RootState) => state.airQual.data);
  const airSelected = useSelector((state: RootState) => state.airQual.selected);
  
  const leftPanelCollapsed = useSelector((state: RootState) => state.leftPanel.isCollapsed);

  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  

  /**
   * 데이터를 Echart에 맞게 변환 
   */
  const convertData = () => {
    const converted = map(gasUsageList, (o) => {
      const coord: GeoCoord = Array.isArray(o.coord) ? o.coord : [0, 0];
      return {
        name: o.lclgvNm,
        value: [...coord, o.avgUseQnt] as GeoCoordVal,
      };
    });  
    return { 
      // data: slice(converted, 10, gasUsageList.length), 
      data: converted, 
      top10Data: slice(converted, 0, 10)
    };
  }

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
        });
  
        await loader.load();
  
        if (chartRef.current) {
          // ECharts 인스턴스 확인 및 제거
          let chart = echarts.getInstanceByDom(chartRef.current);
          if (chart) {
            chart.dispose();
          }
          initChart();
          setIsMapLoaded(true);
        }
      } catch (error) {
        console.error('Google Maps API 또는 ECharts 초기화 중 오류 발생:', error);
        alert(`지도를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.`);
      }
    };
  
    if (!isMapLoaded) {
      initializeMap();
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

  useEffect(() => {
    if(isMapLoaded && gasDataLoaded && airDataLoaded) {
      initOrUpdateChart()
    }
  }, [
    isMapLoaded, 
    gasDataLoaded, 
    airDataLoaded,
    leftPanelCollapsed,
    // convertData
  ]);


  // 클릭한 지자체가 바뀔 때 마다 좌표 이동 
  useEffect(() => {
    try { 
      if (clickedItem && chartRef.current) {
        const chart = echarts.getInstanceByDom(chartRef.current);
        if(chart) {
          const gmap: any = chart.getOption().gmap
          const currentCenter = gmap[0].center;
          const distance = calculateDistance(currentCenter, clickedItem.coord);
          const distanceThreshold = 70; // 거리 임계값 (단위: km)
    
          if (distance > distanceThreshold) {
            // 거리가 임계값보다 크면 줌 아웃 후 확대
            smoothZoomTo(chart, clickedItem.coord, 8, 12, 500);
          } else { // 거리가 임계값 이하이면 바로 확대
            const finalZoomOption = {
              gmap: {
                center: [clickedItem.coord[0] - .05, clickedItem.coord[1]] as GeoCoord,
                zoom: 12,
              }
            }
            updateSelectedItemStyle(chart, finalZoomOption)
          }
  
        }
      }
    } catch(e) {
      console.error('지자체 선택이벤트 오류', {
        clickedItem, 
        gasUsageList,
        airSelected, 
        airQualList,
        e
      })
    }
  }, [clickedItem]);

  /**
   * ECharts 인스턴스 생성
   */
  const initChart = () => {
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
   * ECharts 인스턴스가 이미 존재하면 option 값 업데이트하고, 
   * 없으면 인스턴스 생성 후 option 값 업데이트 함수 실행하는 함수 
   */
  const initOrUpdateChart = async () => {
    if (isMapLoaded && chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        updateEChartOpts();
      } else {
        initChart();
        updateEChartOpts();
      }
    }
  };
  
  /**
   * Echart에 맞게 가공한 데이터 Echart에 업데이트
   */
  const updateEChartOpts = () => {
    try {
      if (chartRef.current) {
        const chart = echarts.getInstanceByDom(chartRef.current);
        if (chart) {
          const { data, top10Data } = convertData();
  
          // 클릭 이벤트 리스너 추가
          chart.on('click', (params: any) => {
            const clickedItem = find(gasUsageList, o => o.lclgvNm === params.name)
            dispatch(click(clickedItem))
            dispatch(selectLclgvNm(params.name))
            dispatch(open())
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
                  return val[2] < 30 ? 9 : val[2] / 5; // 필요에 따라 조정
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
                zlevel: 1
              },
              {
                name: '가스 사용량 Top 10',
                type: 'effectScatter',
                coordinateSystem: 'gmap',
                data: top10Data,
                symbolSize: function (val: [...GeoCoord, number]) {
                  try {
                    return val[2] / 5;
                  } catch(e) {
                    console.error('symbol 사이즈 설정 과정에서 오류 발생', e, { val, top10Data })
                    return 20;
                  }
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
                    try {
                      return getGasUsageColor(max!.avgUseQnt, item.value[2]);
                    } catch(e) {
                      console.error('색상 레벨 설정하는 과정에서 오류 발생', e, { item, max, top10Data })
                      return '#dc3545';
                    }
                  },
                },
                emphasis: {
                  scale: true
                },
              }, 
            ],
          });
        } 
      }
    } catch(e) {
      console.error('Echart에 맞게 가공한 데이터 Echart에 업데이트하는 과정에서 오류 발생', e)
    }
  }

  /**
   * 좌표 이동 함수 
   * @param chart: echarts.ECharts, 
   * @param newCoord: GeoCoord
   * @param initialZoom: 최초 zoom 값 
   * @param finalZoom: 최종 zoom 값 
   * @param duration: 애니메이션이 실행되는 데 걸리는 시간
   */
  const smoothZoomTo = (
    chart: echarts.ECharts, 
    newCoord: GeoCoord, 
    initialZoom: number, 
    finalZoom: number, 
    duration: number
  ) => {
    if (chart) {
      // 첫 번째 단계: zoom을 줄여서 잠깐 표시
      const initialZoomOption = {
        gmap: {
          center: leftPanelCollapsed ? newCoord : [newCoord[0] - .05, newCoord[1]],
          zoom: initialZoom,
        },
      };
      chart.setOption(initialZoomOption);

      // 두 번째 단계: zoom을 finalZoom으로 부드럽게 확대
      setTimeout(() => {
        const finalZoomOption = {
          gmap: {
            center: [newCoord[0] - .05, newCoord[1]] as GeoCoord,
            zoom: finalZoom,
          },
        };
        updateSelectedItemStyle(chart, finalZoomOption);
      }, duration);
    }
  };

  /**
   * 클릭한 아이템의 스타일 속성과 지도 center,zoom 값 변경
   * @param chart :echarts.ECharts
   * @param finalZoomOption 최종 지도 center와 zoom 값 
   */
  const updateSelectedItemStyle = (
    chart: echarts.ECharts, 
    finalZoomOption: { gmap: { center: GeoCoord, zoom: number } }
  ) => {
    if(clickedItem) {
      const option: any = { ...chart.getOption() };
      const newSeries = map(option.series, (series) => ({
        ...series, 
        data: map(series.data, (item) => ({
          ...item, 
          itemStyle: {
            borderWidth: clickedItem.lclgvNm === item.name ? 3 : 0, 
            borderColor: '#fff',
            borderType: 'solid',
            shadowColor: 'rgba(0, 0, 0, 1)',
            shadowBlur: clickedItem.lclgvNm === item.name ? 20 : 0
          }
        }))
      }))

      chart.setOption({
        ...finalZoomOption, 
        series: newSeries, // 변경된 옵션을 차트에 다시 설정
      });
    }
  };

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
  )
};

export default MapChart;

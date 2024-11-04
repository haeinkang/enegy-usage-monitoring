import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { GeoCoord, GeoCoordVal } from '../../types';

const EChartsGMapComponent: React.FC = () => {
  const gasUsageList = useSelector((state: RootState) => state.gasUsage.data);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
    });

    loader
      .load()
      .then(() => {
        if (chartRef.current) {
          try {
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
              },
              series: [
                {
                  type: 'scatter',
                  coordinateSystem: 'gmap',
                  data: [],
                  symbolSize: function (val: any) {
                    return val[2] / 2;
                  },
                },
              ],
            };
            chart.setOption(option);
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

    return () => {
      if (chartRef.current) {
        const chart = echarts.getInstanceByDom(chartRef.current);
        if (chart) {
          chart.dispose();
        }
      }
    };
  }, []);

  const convertData = useCallback(() => {
    return gasUsageList.map((o) => {
      const coord: GeoCoord = Array.isArray(o.coord) ? o.coord : [0, 0];
      return {
        name: o.lclgvNm,
        value: [...coord, o.avgUseQnt] as GeoCoordVal,
      };
    });
  }, [gasUsageList]);

  useEffect(() => {
    if (isMapLoaded && chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        const data = convertData();
        chart.setOption({
          series: [
            {
              type: 'scatter',
              coordinateSystem: 'gmap',
              data: data,
              symbolSize: function (val: any) {
                return val[2] / 2; // 필요에 따라 조정
              },
            },
          ],
        });
      }
    }
  }, [isMapLoaded, gasUsageList, convertData]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default EChartsGMapComponent;

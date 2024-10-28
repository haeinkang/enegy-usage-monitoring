import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts-extension-gmap';
import { ConvertData, AirQualByLclgvNumeric, GeoCoord} from '../../types'
import { slice } from 'lodash';
import { getCtprvnMesureLIst } from '../../services'

interface iProps {
  data: ConvertData[];
  airQualData: AirQualByLclgvNumeric[];
}

/**
 * 에너지 사용량과 대기오염 Top 5를 함께 츨력하는 이중 막대 그래프
 */
function Top5DualChart({ data, airQualData }: iProps) {
  const chartRef = useRef(null);

  
  useEffect(() => {
    if (chartRef.current) {
      // 이미 초기화된 차트 인스턴스가 있는지 확인하고 삭제
      if (echarts.getInstanceByDom(chartRef.current)) {
        echarts.dispose(chartRef.current);
      }

      // ECharts 인스턴스 생성
      const chart = echarts.init(chartRef.current);


      // ECharts 옵션 설정
      const option =  {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: slice(data, 0, 5),
            type: 'bar'
          }
        ]
      };

      // 옵션을 적용하여 차트 생성
      chart.setOption(option);

    }
  }, [data, airQualData]);

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default Top5DualChart;
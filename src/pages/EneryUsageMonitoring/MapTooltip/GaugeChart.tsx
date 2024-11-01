import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { getEchartLevelColor } from '../../../utils'
import { AirQualByLclgvNumeric } from '../../../types';
import { Container, Subtitle2 } from './stlye';

interface iProps {
  title: string;
  min: number;
  max: number;
  data: AirQualByLclgvNumeric
}

function GaugeChart(props: iProps) {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // 이미 초기화된 차트 인스턴스가 있는지 확인하고 삭제
      if (echarts.getInstanceByDom(chartRef.current)) {
        echarts.dispose(chartRef.current);
      }

      // ECharts 인스턴스 생성
      const chart = echarts.init(chartRef.current, 'dark');

      // ECharts 옵션 설정
      const option = {
        backgroundColor: 'rgba(0,0,0,0)',
        axisLine: {
          lineStyle: {
            width: 6
          }
        },
        series: [
          {
            data: [
              {
                // value: props.data.khaiValue,
                value: props.data.khaiValue,
              }
            ],
            type: 'gauge',
            startAngle: 230,
            endAngle: 310,
            min: props.min,
            max: props.max,
            radius: '100%',
            center: ["50%", "50%"],
            detail: {
              fontSize: 30,
              offsetCenter: [0, 0]
            },
            itemStyle: {
               color: getEchartLevelColor('khaiValue', props.data.khaiValue)
            },
            progress: {
              show: true,
              roundCap: true,
              width: 10
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel: {
              show:false
            },
            title: {
              show: true
            },
           
          }
        ]
      };

      // 옵션을 적용하여 차트 생성
      chart.setOption(option);

    }
  }, [props.data]);

  return (
    <Container>
      <div style={{ width: '100%', height: '100px', border: 'solid 1px' }}>
        <div
          ref={chartRef}
          style={{ width: '100%', height: '100%' }}
        />     
      </div>
      <Subtitle2>{props.title}</Subtitle2>
    </Container>
    
  );
}

export default GaugeChart;
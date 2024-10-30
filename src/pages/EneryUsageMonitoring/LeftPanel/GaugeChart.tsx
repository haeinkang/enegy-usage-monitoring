import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { Grid, Typography } from '@mui/material';

interface iProps {
  gridXs: number;
  title: string;
  min: number;
  max: number;
  value: number;
}

function GaugeChart(props: iProps) {
  const airQual = useSelector((state: RootState) => state.airQual.selected);
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
            width: 6,
            color: [
              [0.25, '#000'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        series: [
          {
            type: 'gauge',
            startAngle: 230,
            endAngle: 310,
            min: props.min,
            max: props.max,
            radius: '100%',
            center: ["50%", "50%"],
            data: [
              {
                value: props.value,
              }
            ],
            detail: {
              fontSize: 30,
              offsetCenter: [0, 0]
            },
            itemStyle: {
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
  }, []);



  return (
    <Grid 
      item 
      xs={props.gridXs} 
      container 
      flexDirection='column' 
      alignItems='center' 
      flexWrap='nowrap'
      spacing={1}
    >
      <Grid item sx={{ width: '100%' }}>
        <div
          ref={chartRef}
          style={{ width: '100%', height: '100px' }}
        />     
      </Grid>
      <Grid item>
        <Typography variant='subtitle2'>
          {props.title}
        </Typography>
      </Grid>
    </Grid>
    
  );
}

export default GaugeChart;
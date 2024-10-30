import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../state/store';
import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { selectLclgvNm } from '../../../state/airQualSlice';
import { map } from 'lodash';
import GasUsageCard from './GasUsageCard'
import KhaiGradeCard from './KhaiGradeCard'
import GaugeChart from './GaugeChart'
import AirQualTable from './AirQualTable'

function DetailedAirQuality() {
  const dispatch = useDispatch<AppDispatch>();
  const airQual = useSelector((state: RootState) => state.airQual.selected);

  console.log('선택한 지역읟 대기질', airQual)


  return (
    <div>
      <Grid container alignItems='center'>
        <IconButton>
          <ArrowBackRoundedIcon onClick={() => dispatch(selectLclgvNm(undefined))} />
        </IconButton>
        <Typography variant='h5' fontWeight={700}>
          {airQual?.lclgvNm}
        </Typography>
      </Grid>
      
      {airQual && 
        <Grid container spacing={1} sx={{ height: '137px', mt: 5, mb: 6}}>
          <GasUsageCard 
            gridXs={4}
            title={'가스 사용량'}
          />
          <KhaiGradeCard 
            gridXs={4}
            title={'통합대기환경 지수'}
          />
          <GaugeChart 
            gridXs={4}
            title={'통합대기환경 수치'}
            min={0}
            max={500}
            value={airQual.khaiValue}
          />
        </Grid>
      }

      <AirQualTable />

      <div>
       
      {/* 
        no2Grade 이산화질소 지수 
        no2Value(pin):0.009666666666666665
        
        pm10Value(pin):15.333333333333334 미세먼지(PM10) 농도 (단위: ug/m3))
        
        coGrade(pin):0.6666666666666666
        coValue 일산화탄소 농도(단위: ppm) 
                
       khaiGrade 통합대기환경지수	
        khaiValue(pin):38.333333333333336 통합대기환경수치	

        pm25Grade 초미세먼지 지수
        pm25Value 초미세먼지(PM2.5) 농도(단위: ug/m3)

        o3Grade(pin):1.3333333333333333 오존 지수	
        o3Value
        
        so2Grade 아황산가스 지수	
        so2Value(pin):0.0013333333333333333 아황산가스 농도(단위: ppm) */}

        
      </div>
    </div>
  );
}

export default DetailedAirQuality;




/**
 

✅ 통합대기환경지수(khaiGrade)**와 **종합 수치(khaiValue)**의 
최소/최대 값 기준은 일반적으로 대기오염도를 평가하기 위해 설정된 
공통 기준에 따릅니다. 한국의 통합대기환경지수(KAQI) 기준을 참고하여, 
대기질을 평가하는 지수와 수치의 범위는 다음과 같습니다.
통합대기환경지수(KAQI) 등급 기준 및 범위
좋음 (0-50): 대기 상태가 매우 양호하여 오염물질 농도가 인체에 거의 영향을 미치지 않는 수준
보통 (51-100): 대기 상태가 무난하며, 대부분의 사람들이 실외활동을 해도 무방한 수준
나쁨 (101-250): 대기 상태가 다소 좋지 않아 민감한 사람들이 실외 활동 시 주의가 필요한 수준
매우 나쁨 (251 이상): 대기 상태가 매우 좋지 않아 전반적인 실외 활동에 주의가 필요한 수준
통합대기환경수치(khaiValue) 범위
최소값: 0 (이론적으로 오염물질이 전혀 없는 청정 상태)
최대값: 500 이상 (이 경우 매우 위험한 수준으로 분류)



 */
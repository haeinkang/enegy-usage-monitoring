import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../state/store';
import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { selectLclgvNm } from '../../../state/airQualSlice';
import { selectGasUsage } from '../../../state/gasUsageSlice';
import { map } from 'lodash';
import GasUsageCard from './GasUsageCard'
import KhaiGradeCard from './KhaiGradeCard'
import GaugeChart from './GaugeChart'
import AirQualTable from './AirQualTable'

function DetailedAirQuality() {
  const dispatch = useDispatch<AppDispatch>();
  const airQual = useSelector((state: RootState) => state.airQual.selected);


  const onClickBack = () => {
    dispatch(selectLclgvNm(undefined))
    dispatch(selectGasUsage(undefined))
  }

  return (
    <div>
      <Grid container alignItems='center'>
        <IconButton>
          <ArrowBackRoundedIcon onClick={onClickBack} />
        </IconButton>
        <Typography variant='h5' fontWeight={700}>
          {airQual?.lclgvNm}
        </Typography>
      </Grid>
      
      {
        !airQual 
        ? <div>loading...</div> 
        : (
          <>
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
            <AirQualTable />
          </>
        )
      }
  
    </div>
  );
}

export default DetailedAirQuality;
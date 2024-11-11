import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { selectLclgvNm } from '../../state/airQualSlice';
import { click } from '../../state/gasUsageSlice';
import Summary from './Summary';
import AirQualTable from './AirQualTable'

function DetailedAirQuality() {
  const dispatch = useDispatch<AppDispatch>();
  const clickedItem = useSelector((state: RootState) => state.gasUsage.clickedItem);

  const onClickBack = () => {
    dispatch(selectLclgvNm(undefined))
    dispatch(click(undefined))
   }

  return (
    <div>
      <Grid container alignItems='center'>
        <IconButton onClick={onClickBack}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant='h5' fontWeight={700}>
          {clickedItem?.lclgvNm}
        </Typography>
      </Grid>
      
      <Summary />
      <AirQualTable />
    </div>
  );
}

export default DetailedAirQuality;
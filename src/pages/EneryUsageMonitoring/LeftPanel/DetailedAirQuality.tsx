import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../state/store';
import { Grid, IconButton, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { selectLclgvNm } from '../../../state/airQualSlice';

function DetailedAirQuality() {
  const dispatch = useDispatch<AppDispatch>();
  const lclgvNm = useSelector((state: RootState) => state.airQual.selected);

  return (
    <div>
      <Grid container alignItems='center'>
        <IconButton>
          <ArrowBackRoundedIcon onClick={() => dispatch(selectLclgvNm(undefined))} />
        </IconButton>
        <Typography variant='h5' fontWeight={700}>
          {lclgvNm}
        </Typography>
      </Grid>
    </div>
  );
}

export default DetailedAirQuality;
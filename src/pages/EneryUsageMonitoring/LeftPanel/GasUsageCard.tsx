import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { getGasUsageColor, getColorClassName } from '../../../utils'
import { findIndex } from 'lodash';
import styled from 'styled-components';

interface iProps { 
  gridXs: number;
  title: string;
}
function GasUsageCard(props: iProps) {
  const gasUsageList = useSelector((state: RootState) => state.gasUsage.data);
  const selected = useSelector((state: RootState) => state.gasUsage.selected);
  const max = useSelector((state: RootState) => state.gasUsage.max);

  const topPercent = Math.floor((1 - (
    findIndex(gasUsageList, o => o.lclgvNm === selected?.lclgvNm)
  ) / gasUsageList.length) * 100);

  return (
    selected && max ?
    <Grid 
      item 
      xs={props.gridXs} 
      container 
      flexDirection='column' 
      alignItems='center' 
      flexWrap='nowrap'
      spacing={1}
    >
      <Grid item sx={{ width: '108px' }}>
        <StyledCard className={getColorClassName(max.avgUseQnt, selected.avgUseQnt)}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom align='center' fontWeight={500}>
              {`${selected.avgUseQnt} ㎥`}
            </Typography>
            <Typography variant="body2" align='center' fontWeight={700}>
              {`상위 ${topPercent} %`}
            </Typography>
          </CardContent>
        </StyledCard>
      </Grid>

      <Grid item>
        <Typography variant='subtitle2'>
          {props.title}
        </Typography>
      </Grid>

    </Grid> :
     <></>
  );
}

export default GasUsageCard;


const StyledCard = styled(Card)`
  width: 100%; 
  height: 90%; 
  border-radius: 18px;
  mix-blend-mode: difference !important;
  background: ${(props) => `var(${props.className})`} !important; 
  color: ${(props) => 
    props.className === '--level-3-yellow' 
      ? '#000' : '#fff' 
  } !important; 
`
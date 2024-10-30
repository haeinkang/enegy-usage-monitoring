import { CardContent, Grid, Typography } from '@mui/material';
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
      gap={1}
      sx={{ height: '100%' }}
    >
      <GridCard 
        item 
        flexGrow={1} 
        container 
        flexDirection='column' 
        alignItems='center'
        justifyContent='center'
        className={getColorClassName(max.avgUseQnt, selected.avgUseQnt)}
      >
        <Grid item >
          <Typography variant="h5" component="div" gutterBottom align='center' fontWeight={700}>
            {`${selected.avgUseQnt} ㎥`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" align='center' fontWeight={500}>
            {`상위 ${topPercent} %`}
          </Typography>
        </Grid>
      </GridCard>

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


const GridCard = styled(Grid)`
  width: 100px !important;
  border-radius: 18px;
  background: ${(props) => `var(${props.className})`} !important; 
  color: ${(props) => 
    props.className === '--level-3-yellow' 
      ? '#000' : '#fff' 
  } !important; 
`
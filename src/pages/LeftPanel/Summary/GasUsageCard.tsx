import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { getColorClassName, getTopPercent } from '../../../utils'
import styled from 'styled-components';

interface iProps { 
  gridXs: number;
  title: string;
}
function GasUsageCard(props: iProps) {
  const gasUsageList = useSelector((state: RootState) => state.gasUsage.data);
  const clickedItem = useSelector((state: RootState) => state.gasUsage.clickedItem);
  const max = useSelector((state: RootState) => state.gasUsage.max);
  const topPercent = clickedItem ? getTopPercent(gasUsageList, clickedItem.lclgvNm) : 100;

  return (
    clickedItem && max ?
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
        className={getColorClassName(max.avgUseQnt, clickedItem.avgUseQnt)}
      >
        <Grid item >
          <Typography variant="h5" component="div" gutterBottom align='center' fontWeight={700}>
            {`${clickedItem.avgUseQnt} ㎥`}
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
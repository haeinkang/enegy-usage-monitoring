import React, { useMemo } from 'react';
import { getPaletteNm, getTopPercent } from '../../../utils'
import styled from 'styled-components';
import { Container, Subtitle2, H5, Body2 } from './stlye';
import { EnergyAndAirData } from '../../../types';

interface iProps { 
  title: string;
  hoveredItem: EnergyAndAirData;
  energyAirData: EnergyAndAirData[];
}
function GasUsageCard({
  title,
  hoveredItem, 
  energyAirData,
}: iProps) {
  
  const topPercent = useMemo(() => {
    if(!hoveredItem) return -1;
    return getTopPercent(energyAirData, hoveredItem.lclgvNm)
  }, [hoveredItem, energyAirData])
    
  return (
    <Container>
      <Card color={getPaletteNm(topPercent)}>
        <H5>{`${hoveredItem?.energyUsage?.gas ?? '-'} ㎥`}</H5>
        <Body2>{`상위 ${topPercent} %`}</Body2>
      </Card>
      <Subtitle2>
        {title}
      </Subtitle2>
    </Container>
  );
}

export default GasUsageCard;

const Card = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  border-radius: 18px;
  background: ${(props) => `var(${props.color})`} !important; 
  color: ${(props) => 
    props.color === '--level-3-yellow' 
      ? '#000' : '#fff' 
  }; 
`

import React from 'react';
import { getColorClassName } from '../../../utils'
import { findIndex, maxBy } from 'lodash';
import styled from 'styled-components';
import { GasUsageByLclgv } from '../../../types'
import { Container, Subtitle2, H5, Body2 } from './stlye';

interface iProps { 
  title: string;
  gasUsageList: GasUsageByLclgv[];
  data: GasUsageByLclgv
}
function GasUsageCard(props: iProps) {
  const maxUsage = maxBy(props.gasUsageList, 'avgUseQnt')
  const topPercent = Math.floor((1 - (
      findIndex(props.gasUsageList, o => o.lclgvNm === props.data.lclgvNm)
    ) / props.gasUsageList.length) * 100)
    
  return (
    <Container>
      <Card 
        className={
          maxUsage 
            ? getColorClassName(maxUsage.avgUseQnt, props.data.avgUseQnt)
            : ''
        }
      >
        <H5>{`${props.data.avgUseQnt} ㎥`}</H5>
        <Body2>{`상위 ${topPercent} %`}</Body2>
      </Card>
      
      <Subtitle2>
        {props.title}
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
  background: ${(props) => `var(${props.className})`} !important; 
  color: ${(props) => 
    props.className === '--level-3-yellow' 
      ? '#000' : '#fff' 
  }; 
`

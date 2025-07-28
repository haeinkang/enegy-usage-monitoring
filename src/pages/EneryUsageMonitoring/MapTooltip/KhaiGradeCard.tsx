import { getLevelColor } from '../../../utils'
import { AirQualByLclgv } from '../../../types';
import styled from 'styled-components';
import { Container, Subtitle2, H4 } from './stlye';
import { EnergyAndAirData } from '../../../types';

interface iProps { 
  title: string;
  metric: keyof AirQualByLclgv;
  hoveredItem: EnergyAndAirData;
}
function KhaiGradeCard(props: iProps) {  
  return (
    <Container>
      <Card value={props.hoveredItem.airQual?.khaiValue}>
        <H4>
          {props.hoveredItem.airQual?.[props.metric] ?? '-'}
        </H4>
      </Card>
      <Subtitle2>{props.title}</Subtitle2>
    </Container>
  );
}

export default KhaiGradeCard;

const Card = styled.div<{value?: number}>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  border-radius: 18px;
  background: ${(props) => props.value !== undefined
    ? getLevelColor('khaiValue', props.value)
    : '#D4D9DE' // 해당 데이터 없는 경우
  };
  color: #fff;
`
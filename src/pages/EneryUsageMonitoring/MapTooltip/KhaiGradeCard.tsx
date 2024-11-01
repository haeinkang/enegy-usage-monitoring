import { getLevelColor } from '../../../utils'
import { AirQualByLclgvNumeric } from '../../../types';
import styled from 'styled-components';
import { Container, Subtitle2, H4 } from './stlye';

interface iProps { 
  title: string;
  metric: string;
  data: AirQualByLclgvNumeric;
}
function KhaiGradeCard(props: iProps) {

  return (
    <Container>
      <Card metric={props.metric} value={props.data.khaiValue}>
        <H4>
          {props.metric === 'khaiValue' 
            ? props.data.khaiValue
            : props.data.khaiGrade}
        </H4>
      </Card>

      <Subtitle2>{props.title}</Subtitle2>
    </Container>
  );
}

export default KhaiGradeCard;

const Card = styled.div<{metric: string; value: number}>`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  border-radius: 18px;
  background: ${(props) => getLevelColor('khaiValue', props.value)};
  color: #fff;
`
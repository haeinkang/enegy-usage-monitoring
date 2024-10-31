import styled from 'styled-components';
import { getPolutionLevel, getLevelColor } from '../utils'

const Status = (props: { metric: string; value: number }) => (
  <Icon bgColor={getLevelColor(props.metric, props.value)}> 
    {getPolutionLevel(props.metric, props.value)}
  </Icon>
)

export default Status;

const Icon = styled.div<{bgColor: string}>`
  background: ${(props) => props.bgColor};
  width: fit-content;
  padding: 1px 3px;
  border-radius: 3px;
`
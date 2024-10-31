import styled from 'styled-components';
import { getPolutionLevel, getLevelColor } from '../utils'

const Status = (props: { metric: string; value: number }) => (
  <Icon bgcolor={getLevelColor(props.metric, props.value)}> 
    {getPolutionLevel(props.metric, props.value)}
  </Icon>
)

export default Status;

const Icon = styled.div<{bgcolor: string}>`
  background: ${(props) => props.bgcolor};
  width: fit-content;
  padding: 1px 3px;
  border-radius: 3px;
`
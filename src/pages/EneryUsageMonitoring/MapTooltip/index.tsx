import GasUsageCard from './GasUsageCard'
import KhaiGradeCard from './KhaiGradeCard'
import { EnergyAndAirData } from '../../../types';
import { Title, Summary } from './stlye';

interface iProps { 
  hoveredItem?: EnergyAndAirData 
  energyAirData: EnergyAndAirData[]
}

function MapTooltip(props: iProps) {

  return (
    !props.hoveredItem ? <div>loading..</div> :
      <div>
        <Title>{props.hoveredItem.lclgvNm}</Title>
        <Summary>
          <GasUsageCard 
            title={'가스 사용량'}
            hoveredItem={props.hoveredItem}
            energyAirData={props.energyAirData}
          />
          <KhaiGradeCard 
            title={'통합대기환경 지수'}
            metric={'khaiGrade'}
            hoveredItem={props.hoveredItem}
          />
          <KhaiGradeCard 
            title={'통합대기환경 수치'}
            metric={'khaiValue'}
            hoveredItem={props.hoveredItem}
          />
        </Summary>
      </div>
  );
}

export default MapTooltip;


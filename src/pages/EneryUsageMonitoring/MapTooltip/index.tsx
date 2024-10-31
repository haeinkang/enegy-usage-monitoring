import GasUsageCard from './GasUsageCard'
import KhaiGradeCard from './KhaiGradeCard'
import GaugeChart from './GaugeChart'
import { GasUsageByLclgv, AirQualByLclgvNumeric } from '../../../types';
import { styled } from 'styled-components';
import { Title, Summary } from './stlye';

interface iProps { 
  gasUsageList: GasUsageByLclgv[];
  selectedGasData?: GasUsageByLclgv;
  selectedAirQualData?: AirQualByLclgvNumeric;
}

function MapTooltip(props: iProps) {
  return (
    !(props.selectedGasData && props.selectedAirQualData) 
      ? <div>loading..</div> :
      <div>
        <Title>{props.selectedGasData.lclgvNm}</Title>
        <Summary>
          <GasUsageCard 
            title={'가스 사용량'}
            gasUsageList={props.gasUsageList}
            data={props.selectedGasData}
          />
          <KhaiGradeCard 
            title={'통합대기환경 지수'}
            metric={'khaiGrade'}
            data={props.selectedAirQualData}
          />
          <KhaiGradeCard 
            title={'통합대기환경 수치'}
            metric={'khaiValue'}
            data={props.selectedAirQualData}
          />
          {/* <GaugeChart 
            title={'통합대기환경 수치'}
            min={0}
            max={500}
            data={props.selectedAirQualData}
          /> */}
        </Summary>
      </div>

  );
}

export default MapTooltip;


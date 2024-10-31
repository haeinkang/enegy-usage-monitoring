import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { Grid } from '@mui/material';
import GasUsageCard from './GasUsageCard'
import KhaiGradeCard from './KhaiGradeCard'
import GaugeChart from './GaugeChart'

function Summary() {
  const airQual = useSelector((state: RootState) => state.airQual.selected);

  return (
    !airQual ? <></> :
    <Grid container spacing={1} sx={{ height: '137px', mt: 5, mb: 6}}>
      <GasUsageCard 
        gridXs={4}
        title={'가스 사용량'}
      />
      <KhaiGradeCard 
        gridXs={4}
        title={'통합대기환경 지수'}
      />
      <GaugeChart 
        gridXs={4}
        title={'통합대기환경 수치'}
        min={0}
        max={500}
        value={airQual.khaiValue}
      />
    </Grid>
  );
}

export default Summary;
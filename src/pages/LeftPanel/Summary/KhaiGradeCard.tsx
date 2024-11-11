import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { getLevelColor } from '../../../utils'

interface iProps { 
  gridXs: number;
  title: string;
}
function KhaiGradeCard(props: iProps) {
  const clickedItem = useSelector((state: RootState) => state.gasUsage.clickedItem);

  return (
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
      <Grid 
        item 
        flexGrow={1} 
        container 
        flexDirection='column' 
        alignItems='center'
        justifyContent='center'
        sx={{ 
          width: '100px',
          borderRadius: '18px',
          background: getLevelColor('khaiValue', clickedItem?.airQual?.khaiValue)
        }}
      >
        <Grid item >
          <Typography variant="h4" component="div" align='center' fontWeight={700}>
            {clickedItem?.airQual?.khaiGrade ?? '-'}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant='subtitle2'>
          {props.title}
        </Typography>
      </Grid>

    </Grid>
  );
}

export default KhaiGradeCard;
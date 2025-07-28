import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Chip, Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { selectMetric, changeRange } from '../../state/airQualSlice';
import _, { map, find } from 'lodash'
import { AirQualMetric } from '../../types';

type Mark = {
  value: number; 
  label: string
}

const Separator = styled('div')(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);

function valuetext(value: number) {
  return `${value}`;
}

export default function SliderRange() {
  const dispatch = useDispatch<AppDispatch>();
  const metrics = useSelector((state: RootState) => state.airQual.metrics);
  const [selected, setSelected] = useState<AirQualMetric | undefined>(undefined)
  const [marks, setMarks] = useState<Mark[]>([])

  const handleChangeMetric = (
    event: React.MouseEvent<HTMLElement>,
    newMetric: string,
  ) => {
    dispatch(selectMetric(newMetric))
  };

  useEffect(() => {
    const selected = find(metrics, o => o.selected)
    setSelected(selected)

    if(selected) {
      setMarks([
        {
          value: selected.min,
          label: `${selected.min}`
        },
        {
          value: selected.max,
          label: `${selected.max}`
        },
      ])
    }


  }, [metrics])

  const handleChangeRange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    dispatch(changeRange(newValue))

  }

  return (
    <Paper 
      elevation={10} 
      sx={{ width: '100%', p: '.75rem 1rem' }}
    >
      {selected &&
        <Grid container alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant='subtitle1' fontWeight={900}>
              {`${selected?.name} data ranges:`}
            </Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1}>
              <Chip 
                label={`${selected.min}-${selected.range[0]}`} 
                color="primary" 
                size="small" 
                variant="filled" 
                sx={{ 'span': { fontWeight: 700 }}}
              />
              <Chip 
                label={`${selected.range[1]}-${selected.max}`} 
                color="primary" 
                size="small" 
                variant="filled" 
                sx={{ 'span': { fontWeight: 700 }}}
              />
              <Typography variant='body2'>
                {`${selected.unit}`}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      }
      <ToggleButtonGroup
        value={selected?.name}
        onChange={handleChangeMetric}
        exclusive
        fullWidth
        size='medium'
      >
        {map(metrics, (item) => (
          <ToggleButton value={item.name} key={item.en}>
            {item.en}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Separator />
      {selected && 
        <Slider
          track="inverted"
          size='medium'
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          step={
            selected.name !== 'pm10Value' 
            && selected.name !== 'pm25Value' 
            ? .01 
            : 1
          } 
          onChange={handleChangeRange}
          defaultValue={[selected.max, selected.max]}
          marks={marks}
          min={selected.min}
          max={selected.max}
        />
      }
      
    </Paper>
  );
}

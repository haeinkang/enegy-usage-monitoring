import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Chip, Grid, Stack } from '@mui/material';


const Separator = styled('div')(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 37,
    label: '37',
  },
  {
    value: 100,
    label: '100',
  },
];

function valuetext(value: number) {
  return `${value}`;
}

export default function SliderRange() {
  return (
    <Paper 
      elevation={10} 
      sx={{ width: '100%', p: '.75rem 1rem' }}
    >
      <Grid container alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant='subtitle1' fontWeight={900}>
            {`${'PM10'} data ranges:`}
          </Typography>
        </Grid>
        <Grid item>
        <Stack direction="row" spacing={1}>
          <Chip 
            label="23-10" 
            color="primary" 
            size="small" 
            variant="filled" 
            sx={{ 'span': { fontWeight: 700 }}}
          />
          <Chip 
            label="5-0" 
            color="primary" 
            size="small" 
            variant="filled" 
            sx={{ 'span': { fontWeight: 700 }}}
          />
          <Typography variant='body2'>
            {`${'ug/m3'}`}
          </Typography>
        </Stack>
        </Grid>
      </Grid>

      <ToggleButtonGroup
        value={'left'}
        // exclusive
        // aria-label="text alignment"
        fullWidth
        size='medium'
      >
        <ToggleButton value="left" aria-label="left aligned">
          PM10
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          PM2.5
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          CO
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified">
          NO2
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified">
          SO2
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified">
          O3
        </ToggleButton>
{/*         
        <ToggleButton value="left" aria-label="left aligned">
          미세먼지 (PM10)
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          초미세먼지 (PM2.5)
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          일산화탄소 (CO)
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified">
          이산화질소 (NO2)
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified">
          아황산가스 (SO2)
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified">
          오존 지수 (O3)
        </ToggleButton> */}
      </ToggleButtonGroup>

      <Separator />
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-range-slider"
        getAriaValueText={valuetext}
        defaultValue={[20, 37]}
        marks={marks}
        size='medium'
      />
      
    </Paper>
  );
}

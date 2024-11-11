import React from 'react';
import styled from 'styled-components';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CloudCircleOutlinedIcon from '@mui/icons-material/CloudCircleOutlined';

function PollutantIcon({ name }: { name: string }) {
  return (
    <Box>
      {name === 'khai' ? <CloudCircleOutlinedIcon fontSize='small' />
        : name === 'pm10' ? <GrainOutlinedIcon fontSize='small' />
        : name === 'pm25' ? <BlurOnIcon fontSize='small' />
        : name === 'co' ? <LocalFireDepartmentOutlinedIcon fontSize='small' />
        : name === 'no2' ? <FilterDramaOutlinedIcon fontSize='small'/>
        : name === 'so2' ? <FactoryOutlinedIcon fontSize='small'/>
        : name === 'o3' ? <SpokeOutlinedIcon fontSize='small'/>
        : <CoronavirusOutlinedIcon />
      }
    </Box>
  );
}

export default PollutantIcon;

const Box = styled.div`
  width: fit-content;
  padding: 1px 4px;
  // background: #fff;
  // color: #000;
  font-weight: 700;
  // font-size: small;
  font-family: "Bowlby One", serif;
  font-weight: 700;
`


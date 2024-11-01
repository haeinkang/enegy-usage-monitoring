import React from 'react';
import styled from 'styled-components';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';

function Banner({ name }: { name: string }) {
  return (
    <Box>
      {name === 'PM10' ? <GrainOutlinedIcon fontSize='small' />
        : name === 'PM2.5' ? <BlurOnIcon fontSize='small' />
        : name === 'CO' ? <LocalFireDepartmentOutlinedIcon fontSize='small' />
        : name === 'NO2' ? <FilterDramaOutlinedIcon fontSize='small'/>
        : name === 'SO2' ? <FactoryOutlinedIcon fontSize='small'/>
        : name === 'O3' ? <SpokeOutlinedIcon fontSize='small'/>
        : <CoronavirusOutlinedIcon />
      }
    </Box>
  );
}

export default Banner;

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


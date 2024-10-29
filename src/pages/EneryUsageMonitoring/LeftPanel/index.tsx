import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Box, Autocomplete, Grid, Typography, Button, Paper, Avatar, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Chip } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import _, { map, includes, sortBy, find } from 'lodash'
import { getAirQualityColor } from '../../../utils'
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import GasUsageRank from './GasUsageRank'

function LeftPanel() {
  const airQualData = useSelector((state: RootState) => state.airQual.data);

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelect] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    getOptions();
  }, [airQualData])

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const getOptions = () => {
    const lclgvNmList = map(airQualData, 'lclgvNm')
    const cityList = _(airQualData)
      .map(o => o.lclgvNm.split(' ')[0])
      .uniq()
      .value();

    setOptions(sortBy([...cityList, ...lclgvNmList]))
  }


  return (
    <GridContainer>
      <Panel square elevation={10} isCollapsed={isCollapsed}>
      <GasUsageRank />

      </Panel>
      <CollapseButton variant="contained" onClick={handleCollapse}>
        {isCollapsed  
          ? <KeyboardArrowRightRoundedIcon /> 
          : <KeyboardArrowLeftRoundedIcon />
        }
      </CollapseButton>
    </GridContainer>
  );
}

export default LeftPanel;

const GridContainer = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

// Panel 컴포넌트에 추가 속성 타입을 정의합니다.
interface PanelProps {
  isCollapsed: boolean;
}

const Panel = styled(Paper)<PanelProps>`
  width: ${(props) => (props.isCollapsed ? '0' : 'calc(10vw + 16rem)')};
  padding: 15px 20px;
  transition: width 0.3s ease, padding 0.3s ease !important;
  background: var(--joy-palette-neutral-800) !important;
`;

const CollapseButton = styled(Button)`
  border-radius: 0 4px 4px 0 !important;
  min-width: 25px !important;
  width: 25px;
  height: 50px !important;
  padding: 6px !important;
  margin-top: 10px !important;
  // background: var(--action-active) !important;
  background: var(--joy-palette-neutral-800) !important;

  svg {
    color: #fff;
  }
`;

const Mark = styled.div<{ value: number }>`
  width: 1rem;
  height: 1rem;
  border-radius: .125rem;
  background: ${(props) => getAirQualityColor(props.value)};
`
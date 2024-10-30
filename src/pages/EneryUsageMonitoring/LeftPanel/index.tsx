import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Box, Autocomplete, Grid, Typography, Button, Paper, Avatar, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Chip } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { getAirQualityColor } from '../../../utils'
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import GasUsageRank from './GasUsageRank'
import DetailedAirQuality from './DetailedAirQuality'

function LeftPanel() {
  const lclgvNm = useSelector((state: RootState) => state.airQual.selected);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <GridContainer>
      <Panel square elevation={10} isCollapsed={isCollapsed}>
      { lclgvNm 
        ? <DetailedAirQuality />
        : <GasUsageRank />
      }
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
  width: ${(props) => (props.isCollapsed ? '0' : 'calc(10vw + 24rem)')};
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

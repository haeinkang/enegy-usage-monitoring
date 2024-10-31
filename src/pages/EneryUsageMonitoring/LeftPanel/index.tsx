import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Box, Autocomplete, Grid, Typography, Button, Paper, Avatar, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Chip } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../state/store';
import GasUsageRank from './GasUsageRank'
import DetailedAirQuality from './DetailedAirQuality'
import { clickCollapseBtn } from '../../../state/leftPanelSlice';

function LeftPanel() {
  const selectedGasUsage = useSelector((state: RootState) => state.gasUsage.selected);
  const isCollapsed = useSelector((state: RootState) => state.leftPanel.isCollapsed);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <GridContainer>
      <Panel square elevation={10} isCollapsed={isCollapsed}>
        { selectedGasUsage 
          ? <DetailedAirQuality />
          : <GasUsageRank />
        }
      </Panel>

      <CollapseButton 
        isCollapsed={isCollapsed}
        onClick={() => dispatch(clickCollapseBtn())}
        variant="contained" 
      >
        {isCollapsed  
          ? <ArrowForwardIosRoundedIcon /> 
          : <ArrowBackIosNewRoundedIcon />
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

const Panel = styled(Paper)<{ isCollapsed: boolean; }>`
  background: var(--joy-palette-neutral-800) !important;
  width: ${(props) => (props.isCollapsed ? '0' : 'calc(10vw + 24rem)')};
  padding: ${(props) => (props.isCollapsed ? '0' : '15px 20px')};
  transition: width 0.3s ease, padding 0.3s ease !important;
  * {
    display: ${(props) => (props.isCollapsed ? 'none !important' : 'block')};
  }
`;

const CollapseButton = styled(Button)<{ isCollapsed: boolean; }>`
  border-radius: 0 4px 4px 0 !important;
  min-width: 30px !important;
  width: 30px;
  height: 55px !important;
  padding: 6px !important;
  margin-top: 10px !important;
  background: ${(props) => `var(--joy-palette-neutral-${props.isCollapsed ? '700' : '800'})`} !important;
  svg {
    color: #fff;
  }
`;

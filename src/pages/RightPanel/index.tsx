import React from 'react';
import styled from 'styled-components';
import { Button, Paper } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { clickCollapseBtn } from '../../state/rightPanelSlice';
import AboutMe from './AboutMe';

function RightPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const isCollapsed = useSelector((state: RootState) => state.rightPanel.isCollapsed);;

  return (
    <GridContainer>
      {!isCollapsed && 
        <CollapseButton 
          collapsed={`${isCollapsed}`}
          onClick={() => dispatch(clickCollapseBtn())}
          variant="contained" 
        >
          <ArrowForwardIosRoundedIcon />
        </CollapseButton>
      }
      <Panel square elevation={10} collapsed={`${isCollapsed}`}>
        <AboutMe />
      </Panel>
    </GridContainer>
  );
}

export default RightPanel;

const GridContainer = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const Panel = styled(Paper)<{ collapsed: 'true' | 'false'; }>`
  background: var( --joy-palette-aboutme-bg);
  color: var( --joy-palette-aboutme-color) !important;
  width: ${(props) => (props.collapsed === 'true' ? '0' : 'calc(3vw + 24rem)')};
  padding: ${(props) => (props.collapsed === 'true' ? '0' : '30px')};
  transition: width 0.3s ease, padding 0.3s ease !important;
  * {
    display: ${(props) => (props.collapsed === 'true' ? 'none !important' : 'block')};
  }
`;

const CollapseButton = styled(Button)<{ collapsed: 'true' | 'false'; }>`
  background: var( --joy-palette-aboutme-bg) !important;
  border-radius: 4px 0 0 4px !important;
  min-width: 30px !important;
  width: 30px;
  height: 55px !important;
  padding: 6px !important;
  margin-top: 10px !important;
  svg {
    color: #fff;
  }
`;

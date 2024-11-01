import React from 'react';
import styled from 'styled-components';
import { Button, Paper } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { clickCollapseBtn } from '../../state/rightPanelSlice';

function RightPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const isCollapsed = useSelector((state: RootState) => state.rightPanel.isCollapsed);;

  return (
    <GridContainer>
      <CollapseButton 
        collapsed={`${isCollapsed}`}
        onClick={() => dispatch(clickCollapseBtn())}
        variant="contained" 
      >
        {isCollapsed  
          ? <ArrowBackIosNewRoundedIcon />
          : <ArrowForwardIosRoundedIcon /> 
        }
      </CollapseButton>
      <Panel square elevation={10} collapsed={`${isCollapsed}`}>
     
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
  background: var(--joy-palette-neutral-800) !important;
  width: ${(props) => (props.collapsed === 'true' ? '0' : 'calc(10vw + 24rem)')};
  padding: ${(props) => (props.collapsed === 'true' ? '0' : '20px')};
  transition: width 0.3s ease, padding 0.3s ease !important;
  * {
    display: ${(props) => (props.collapsed === 'true' ? 'none !important' : 'block')};
  }
`;

const CollapseButton = styled(Button)<{ collapsed: 'true' | 'false'; }>`
  border-radius: 4px 0 0 4px !important;
  min-width: 30px !important;
  width: 30px;
  height: 55px !important;
  padding: 6px !important;
  margin-top: 10px !important;
  background: ${(props) => `var(--joy-palette-neutral-${props.collapsed === 'true' ? '700' : '800'})`} !important;
  svg {
    color: #fff;
  }
`;

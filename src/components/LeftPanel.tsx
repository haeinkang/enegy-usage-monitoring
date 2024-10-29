import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Box, Autocomplete, Grid, Typography, Button, Paper, Avatar, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Chip } from '@mui/material';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { AirQualByRegMerics, LclgvCoords, GasUsageByLclgv, AirQualByLclgvNumeric} from '../types'
import _, { map, includes, sortBy, find } from 'lodash'
import { getAirQualityColor } from '../utils'
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';


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
    
        <Typography variant="subtitle1">
          가스 소비에 따른 미세먼지 순위 (ug/m3)
        </Typography>
    
        <Autocomplete
          multiple
          defaultValue={[]}
          options={options}
          getOptionLabel={(option) => option}
          // renderTags={(value, getTagProps) =>
          //   value.map((option, index) => {
          //     const { key, ...tagProps } = getTagProps({ index });
          //     return (
          //       <div {...tagProps}>{option}</div>
          //     );
          //   })
          // }
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  variant="outlined"
                  label={option}
                  size="small"
                  {...tagProps}
                />
              );
            })
          }
          onChange={(event: any, newValue: string[]) => {
            setSelect(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          disablePortal
          sx={{ width: '100%', margin: '20px 0 10px' }}
          size='small'
          renderInput={(params) => 
            <TextField {...params} label="지역 검색" variant="filled"/>
          }
        />
        <Box
          sx={{ width: '100%', height: 400, bgcolor: 'inherit', overflow: 'scroll' }}
        >
        <List dense disablePadding sx={{ width: '100%' }}>
          {
            _(airQualData)
              .filter(o => 
                selected.length > 0 
                ? find(selected, sel => includes(o.lclgvNm, sel)) !== undefined
                : true
              )
              .orderBy('pm10Value', 'desc')
              .map((item, idx) => {
                const region = item.lclgvNm.split(' ');
                return (
                  <ListItem disablePadding sx={{ borderRadius: '3px', marginBottom: .5, bgcolor: 'rgba(255, 255, 255, 0.09)' }}> 
                    <ListItemButton dense>
                      <Grid container gap={1.5} alignItems="center" >
                        <span>{idx + 1}</span>
                        <Mark value={item.pm10Value} />
                        <ListItemText
                          primary={region[0]}
                          secondary={region[1]}
                        />
                        <span>{item.pm10Value}</span>
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                )
              })
              .value()
          }
        </List>
        </Box>

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
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Autocomplete, Grid, Typography, List, ListItem, ListItemButton, ListItemText, Chip, Skeleton, Stack } from '@mui/material';
import _, { map, includes, sortBy, find } from 'lodash'
import { getPaletteNm, getTopPercent } from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { click } from '../../state/gasUsageSlice';
import { selectLclgvNm } from '../../state/airQualSlice';
import { selectRegions } from '../../state/leftPanelSlice';
import { EnergyAndAirData } from '../../types'
import SliderRange from './SliderRange';



function GasUsageRank() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    energyAirData,
    loaded,
  } = useSelector((state: RootState) => state.gasUsage);
  const { selectedRegions } = useSelector((state: RootState) => state.leftPanel);

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    getOptions();
  }, [energyAirData])

  const getOptions = () => {
    const options = _.chain(energyAirData)
      .flatMap(({ lclgvNm, sidoName }) => [lclgvNm, sidoName])
      .uniq()
      .sortBy()
      .value();

    setOptions(options);
  }

  const onClickListItem = (selected: EnergyAndAirData) => {
    dispatch(click(selected))
  }


  return (
    <Grid container flexDirection='column' flexWrap='nowrap' sx={{ height: '100%' }}>
      <Grid item>
        <Typography variant="subtitle1">
          가스 사용량 순위 (㎥)
        </Typography>  
      </Grid>
      <Grid item>
        <Autocomplete
          multiple
          defaultValue={selectedRegions}
          options={options}
          getOptionLabel={(option) => option}
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
            dispatch(selectRegions(newValue));
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
      </Grid>
      <Grid item flexGrow={1} sx={{ overflow: 'auto', mb: '20px' }}>
        {
          loaded
          ? (
            <List 
              dense 
              disablePadding  
              sx={{ width: '100%', overflow: 'auto' }}>
              {
                _(energyAirData)
                  .filter(o => 
                    selectedRegions.length > 0 
                    ? find(selectedRegions, sel => includes(o.lclgvNm, sel)) !== undefined
                    : true
                  )
                  .map((item, idx) => {
                    const region = item.lclgvNm.split(' ');       
                    const topPercent = getTopPercent(energyAirData, item.lclgvNm)
                    return (
                      <ListItem key={idx} disablePadding sx={{ borderRadius: '3px', marginBottom: .5, bgcolor: 'rgba(255, 255, 255, 0.09)' }}> 
                        <ListItemButton 
                          onClick={() => onClickListItem(item)} 
                          dense
                        >
                          <Grid container gap={1.5} alignItems="center" >
                            <span>{idx + 1}</span>
                            <Mark palettenm={getPaletteNm(topPercent)} />
                            <ListItemText
                              primary={region[0]}
                              secondary={region[1]}
                            />
                            <span>{`${item.energyUsage.gas} ㎥`}</span>
                          </Grid>
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                  .value()
              }
            </List>
          )
          : (
            <Stack spacing={0}>
              {map(Array(8).fill(0), (_, idx) => 
                <Skeleton
                  key={idx}
                  animation="wave"
                  height={100}
                  width="100%"
                  style={{ marginBottom: 6 }}
                />
              )}
            </Stack>
          ) 
        }
      </Grid>

      <Grid item>
        <SliderRange />
      </Grid>
    </Grid>
  );
}

export default GasUsageRank;

const Mark = styled.div<{ palettenm: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: .125rem;
  background: ${(props) => `var(${props.palettenm})`};
`
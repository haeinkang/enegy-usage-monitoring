import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Box, Autocomplete, Grid, Typography, Button, Paper, Avatar, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, Chip } from '@mui/material';
import _, { maxBy, map, includes, sortBy, find } from 'lodash'
import { getGasUsageColor } from '../../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../state/store';
import { selectGasUsage } from '../../../state/gasUsageSlice';
import { selectLclgvNm } from '../../../state/airQualSlice';
import { GasUsageByLclgv } from '../../../types'



function GasUsageRank() {
  const dispatch = useDispatch<AppDispatch>();
  const gasUsage = useSelector((state: RootState) => state.gasUsage.data);
  const maxGasUsage = useSelector((state: RootState) => state.gasUsage.max);

  const [filtered, setFiltered] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    getOptions();
  }, [gasUsage])

  const getOptions = () => {
    const lclgvNmList = map(gasUsage, 'lclgvNm')
    const cityList = _(gasUsage)
      .map(o => o.lclgvNm.split(' ')[0])
      .uniq()
      .value();

    setOptions(sortBy([...cityList, ...lclgvNmList]))
  }

  const onClickListItem = (selected: GasUsageByLclgv) => {
    dispatch(selectLclgvNm(selected.lclgvNm))
    dispatch(selectGasUsage(selected))
  }


  return (
    <>
      <Typography variant="subtitle1">
        가스 사용량 순위 (㎥)
      </Typography>
      <Autocomplete
        multiple
        defaultValue={[]}
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
          setFiltered(newValue);
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
            _(gasUsage)
              .filter(o => 
                filtered.length > 0 
                ? find(filtered, sel => includes(o.lclgvNm, sel)) !== undefined
                : true
              )
              .orderBy('pm10Value', 'desc')
              .map((item, idx) => {
                const region = item.lclgvNm.split(' ');
                return (
                  <ListItem key={`pm10-${idx}`} disablePadding sx={{ borderRadius: '3px', marginBottom: .5, bgcolor: 'rgba(255, 255, 255, 0.09)' }}> 
                    <ListItemButton 
                      onClick={() => onClickListItem(item)} 
                      dense
                    >
                      <Grid container gap={1.5} alignItems="center" >
                        <span>{idx + 1}</span>
                        <Mark 
                          value={item.avgUseQnt}
                          max={maxGasUsage?.avgUseQnt || 0} 
                        />
                        <ListItemText
                          primary={region[0]}
                          secondary={region[1]}
                        />
                        <span>{`${item.avgUseQnt} ㎥`}</span>
                      </Grid>
                    </ListItemButton>
                  </ListItem>
                )
              })
              .value()
          }
        </List>
      </Box>
    </>
  );
}

export default GasUsageRank;

const Mark = styled.div<{ value: number, max: number }>`
  width: 1rem;
  height: 1rem;
  border-radius: .125rem;
  background: ${(props) => getGasUsageColor(props.max, props.value)};
`
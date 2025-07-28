import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { transform, map, find } from 'lodash'
import PollutantIcon from './PollutantIcon'
import { Status } from '../../components'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, Typography } from '@mui/material';
 
interface PollutantData {
  value: string | number;
  grade: string | number;
}
interface TransformedData {
  lclgvNm: string;
  sidoName: string;
  dataTime: string;
  khai?: PollutantData;
  pm10?: PollutantData;
  pm25?: PollutantData;
  so2?: PollutantData;
  co?: PollutantData;
  no2?: PollutantData;
  o3?: PollutantData;
  [key: string]: any;
}

function AirQualTable() {
  const { clickedItem, metrics } = useSelector((state: RootState) => state.gasUsage);

  const pollutantMetrics: TransformedData | undefined = useMemo(() => {
    if(!clickedItem?.airQual) return undefined;
    return transform(
      clickedItem.airQual,
      (result, value, key) => {
        const match = key.match(/(.*?)(Value|Grade)$/);
        console.log({match})
        if (match) {
          const [_, pollutant, type] = match;
          result[pollutant] = result[pollutant] || {};
          (result[pollutant] as PollutantData)[type.toLowerCase() as keyof PollutantData] = value;
        }
      },
      {} as TransformedData
    );
  }, [clickedItem])

  return (
    !clickedItem ? <div>loading...</div> : 
    <div>
      <Typography variant='h6' fontWeight={700}>
        대기오염 정보
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>물질</TableCell>
              <TableCell>지수</TableCell>
              <TableCell>농도</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {map(pollutantMetrics, (item, pollutant) => {
              const metric = find(metrics, { name: pollutant });
              return (
                <TableRow>
                  <TableCell>
                    <Grid container alignItems='center' spacing={1}>
                      <Grid item>
                        <PollutantIcon name={pollutant} />
                      </Grid>
                      <Grid item> 
                        {`${metric?.ko ?? ''} (${metric?.en ?? ''})`}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>{item.grade}</TableCell>
                  <TableCell>{`${item.value} ${metric?.unit ?? ''}`}</TableCell>
                  <TableCell>
                    <Status metric={`${pollutant}Value`} value={item.value} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AirQualTable;
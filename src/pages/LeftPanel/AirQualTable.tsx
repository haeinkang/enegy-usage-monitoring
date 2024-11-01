import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { map } from 'lodash'
import Banner from './Banner'
import styled from 'styled-components';
import { Status } from '../../components'

function AirQualTable() {
  const data = useSelector((state: RootState) => state.airQual.selected);
  const metrics = useSelector((state: RootState) => state.airQual.metrics);

  return (
    !data ? <div>loading...</div> : 
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
            <TableRow>
              <TableCell>
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <Banner name={metrics['pm10Value'].en} />
                  </Grid>
                  <Grid item> 
                    {`${metrics['pm10Value'].ko} (${metrics['pm10Value'].en})`}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{data.pm10Grade}</TableCell>
              <TableCell>{`${data.pm10Value} ${metrics['pm10Value'].unit}`}</TableCell>
              <TableCell>
                <Status metric={'pm10Value'} value={data.pm10Value} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <Banner name={metrics['pm25Value'].en} />
                  </Grid>
                  <Grid item> 
                    {`${metrics['pm25Value'].ko} (${metrics['pm25Value'].en})`}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{data.pm25Grade}</TableCell>
              <TableCell>{`${data.pm25Value} ${metrics['pm25Value'].unit}`}</TableCell>
              <TableCell>
                <Status metric={'pm25Value'} value={data.pm25Value} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <Banner name={metrics['coValue'].en} />
                  </Grid>
                  <Grid item> 
                    {`${metrics['coValue'].ko} (${metrics['coValue'].en})`}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{data.coGrade}</TableCell>
              <TableCell>{`${data.coValue} ${metrics['coValue'].unit}`}</TableCell>
              <TableCell>
                <Status metric={'coValue'} value={data.coValue} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <Banner name={metrics['no2Value'].en} />
                  </Grid>
                  <Grid item> 
                    {`${metrics['no2Value'].ko} (${metrics['no2Value'].en})`}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{data.no2Grade}</TableCell>
              <TableCell>{`${data.no2Value} ${metrics['no2Value'].unit}`}</TableCell>
              <TableCell>
                <Status metric={'no2Value'} value={data.no2Value} />
              </TableCell>  
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <Banner name={metrics['so2Value'].en} />
                  </Grid>
                  <Grid item> 
                    {`${metrics['so2Value'].ko} (${metrics['so2Value'].en})`}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{data.so2Grade}</TableCell>
              <TableCell>{`${data.so2Value} ${metrics['so2Value'].unit}`}</TableCell>
              <TableCell>
                <Status metric={'so2Value'} value={data.so2Value} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Grid container alignItems='center' spacing={1}>
                  <Grid item>
                    <Banner name={metrics['o3Value'].en} />
                  </Grid>
                  <Grid item> 
                    {`${metrics['o3Value'].ko} (${metrics['o3Value'].en})`}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>{data.o3Grade}</TableCell>
              <TableCell>{`${data.o3Value} ${metrics['o3Value'].unit}`}</TableCell>
              <TableCell>
                <Status metric={'o3Value'} value={data.o3Value} />
              </TableCell>
            </TableRow>
            
          
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AirQualTable;
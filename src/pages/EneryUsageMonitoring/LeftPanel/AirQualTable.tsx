import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import { map } from 'lodash'
import Banner from './Banner'

function AirQualTable() {
  const data = useSelector((state: RootState) => state.airQual.selected);
  const metrics = useSelector((state: RootState) => state.airQual.metrics);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>물질</TableCell>
            <TableCell>농도</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>

        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Grid container alignItems='center' spacing={.5}>
                <Grid item>
                  {/* <Banner name={'pm10Value'} /> */}
                  <Banner name={metrics['pm10Value'].en} />
                </Grid>
                <Grid item> 
                  {metrics['pm10Value'].ko}
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>{`${data?.pm10Value} ${metrics['pm10Value'].unit}`}</TableCell>
            <TableCell>[상태]</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Grid container alignItems='center' spacing={.5}>
                <Grid item>
                  {/* <Banner name={'pm25Value'} /> */}
                  <Banner name={metrics['pm25Value'].en} />
                </Grid>
                <Grid item> 
                  {metrics['pm25Value'].ko}
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>{`${data?.pm25Value} ${metrics['pm25Value'].unit}`}</TableCell>
            <TableCell>[상태]</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Grid container alignItems='center' spacing={.5}>
                <Grid item>
                  {/* <Banner name={'coValue'} /> */}
                  <Banner name={metrics['coValue'].en} />
                </Grid>
                <Grid item> 
                  {metrics['coValue'].ko}
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>{`${data?.coValue} ${metrics['coValue'].unit}`}</TableCell>
            <TableCell>[상태]</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Grid container alignItems='center' spacing={.5}>
                <Grid item>
                  {/* <Banner name={'no2Value'} /> */}
                  <Banner name={metrics['no2Value'].en} />
                </Grid>
                <Grid item> 
                  {metrics['no2Value'].ko}
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>{`${data?.no2Value} ${metrics['no2Value'].unit}`}</TableCell>
            <TableCell>[상태]</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Grid container alignItems='center' spacing={.5}>
                <Grid item>
                  {/* <Banner name={'so2Value'} /> */}
                  <Banner name={metrics['so2Value'].en} />
                </Grid>
                <Grid item> 
                  {metrics['so2Value'].ko}
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>{`${data?.so2Value} ${metrics['so2Value'].unit}`}</TableCell>
            <TableCell>[상태]</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Grid container alignItems='center' spacing={.5}>
                <Grid item>
                  {/* <Banner name={'o3Value'} /> */}
                  <Banner name={metrics['o3Value'].en} />
                </Grid>
                <Grid item> 
                  {metrics['o3Value'].ko}
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>{`${data?.o3Value} ${metrics['o3Value'].unit}`}</TableCell>
            <TableCell>[상태]</TableCell>
          </TableRow>
          
         
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AirQualTable;
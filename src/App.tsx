import React from 'react';
import { Header } from './components'
import { Routes, Route } from 'react-router-dom';
import { LeftPanel, RightPanel, EneryUsageMonitoring, NotFound } from './pages';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid container flexDirection='column' flexWrap='nowrap' sx={{ height: '100%' }}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item flexGrow={1}>
        <div style={{ position: 'relative', width: '100%', height: '100%'}}>          
          <LeftPanel />
          <RightPanel />
          <Routes>
            <Route path="/" element={<EneryUsageMonitoring />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </div>
      </Grid>

    </Grid>
  );
}

export default App;

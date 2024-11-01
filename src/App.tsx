import React from 'react';
import styled from 'styled-components'
import { Header } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EneryUsageMonitoring, NotFound } from './pages';
import LeftPanel from './pages/LeftPanel';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid container flexDirection='column' flexWrap='nowrap' sx={{ height: '100%' }}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item flexGrow={1}>
        <div style={{ position: 'relative', width: '100%', height: '100%'}}>          
          <Router>
            <Routes>
              <Route path="/" element={<EneryUsageMonitoring />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </Router>
          
          <LeftPanel />
        </div>
      </Grid>

    </Grid>
  );
}

export default App;

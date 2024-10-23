import React from 'react';
import styled from 'styled-components'
import { Header, Footer } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EneryUsageMonitoring, NotFound } from './pages';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <Wrapper>
      <ThemeProvider theme={darkTheme}>
      <Header />
      
      <Router>
        <Routes>
          <Route path="/" element={<EneryUsageMonitoring />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Router>

        <Footer />
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
`;

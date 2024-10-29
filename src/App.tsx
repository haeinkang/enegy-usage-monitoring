import React from 'react';
import styled from 'styled-components'
import { Header, Footer } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EneryUsageMonitoring, NotFound } from './pages';

function App() {
  return (
    <Wrapper>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<EneryUsageMonitoring />} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </Router>
      <Footer />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
`;

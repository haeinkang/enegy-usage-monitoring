import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EneryUsageMonitoring, NotFound } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EneryUsageMonitoring />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
import React from "react";
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { EneryUsageMonitoring, NotFound } from "./pages";
import { Grid } from "@mui/material";
import Layout from "./Layout";

function App() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EneryUsageMonitoring />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

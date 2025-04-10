import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingIndicator from "./components/LoadingIndicator";
import Layout from "./Layout";
const EneryUsageMonitoring = lazy(() => import("./pages/EneryUsageMonitoring"));
const NotFound = lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
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

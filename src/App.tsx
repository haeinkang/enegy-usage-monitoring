import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
// const EneryUsageMonitoring = lazy(() => import("./pages/EneryUsageMonitoring"));
const EneryUsageMonitoring = lazy(
  () =>
    new Promise<typeof import("./pages/EneryUsageMonitoring")>((resolve) =>
      setTimeout(() => resolve(import("./pages/EneryUsageMonitoring")), 1000)
    )
);
const NotFound = lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <Suspense
      fallback={
        <div>
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
          </span>
        </div>
      }
    >
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

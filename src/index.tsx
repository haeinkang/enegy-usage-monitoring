import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: '"Comfortaa", sans-serif',
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <MuiThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

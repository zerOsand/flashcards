import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./utils/theme";

const root =
	  ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<React.StrictMode>
			<ThemeProvider theme={createTheme(theme)}>
				<App />
			</ThemeProvider>
		</React.StrictMode>
);

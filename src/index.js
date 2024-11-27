import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./utils/theme";

const root = document.getElementById("root");

ReactDOM.render(
	<ThemeProvider theme={createTheme(theme)}>
		<App />
	</ThemeProvider>,
	root
);

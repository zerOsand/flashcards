import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CardProvider } from "./state/CardProvider.js";
import MainPage from "./pages/mainPage.js";
import "./App.css";


function App() {
	return (
		<Router>
			<CardProvider>
				<Routes>
					<Route path="/" element={<MainPage />} />
				</Routes>
			</CardProvider>
		</Router>
	);
}

export default App;

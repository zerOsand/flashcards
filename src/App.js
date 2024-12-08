import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CardProvider } from "./state/CardProvider.js";
import Home from "./pages";
import Practice from "./pages/Practice";
import { SearchProvider } from './components/Searchbar/SearchContext';
import "./App.css";


function App() {
	return (
		<Router>
			<SearchProvider>
				<CardProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/practice" element={<Practice />} />
					</Routes>
				</CardProvider>
			</SearchProvider>
		</Router>
	);
}

export default App;

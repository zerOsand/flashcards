import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages'
import Tags from './pages/tags'
import { CardProvider } from './state/CardProvider.js'

function App() {
	return (
		<Router>
			<Navbar />
			<CardProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/tags/*' element={<Tags />} />
				</Routes>
			</CardProvider>
		</Router>
	)
}

export default App

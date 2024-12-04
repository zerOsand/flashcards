import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect, } from 'react'
import Navbar from "../../components/Navbar";
import ClickList from '../../components/ClickList'
import { useTheme } from "@mui/material/styles";
import { RotateLeft, ThumbUp, ThumbDown, Home } from "@mui/icons-material";

const Practice = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const theme = useTheme()
	const [cards, setCards] = useState([])
	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
	const [index, setIndex] = useState(0)

	useEffect(() => {
		setCards(shuffle([...location.state?.cards || []]))
	}, [])

	/**
	 * Given integer NUM to advance by,
	 * updates the INDEX.
	 */
	const advance = (num) => {
		let i = index + num
		if (i < 0)
			i = 0
		if (i > cards.length * 2 -1)
			i = cards.length * 2 - 1
		setIndex(i)
	}

	const handleHome = () => {
		navigate('/')
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 16px)", }}>
			<Box sx={{backgroundColor: "#fff" }}>
				<Navbar />
			</Box>
			<Box sx={{
					display: 'flex',
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
					height: "80%",
					margin: 'auto',
					width: "60%",
					borderRadius: '20px',
					boxSizing: 'border-box',
					boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
					padding: '20px',
				}}>
				<Box sx={{
						display: 'flex',
						flexGrow: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						textAlign: 'center',
						alignItems: 'center',
						wordWrap: 'anywhere',
						overflowWrap: 'anywhere',
						hyphens: 'auto',
						userSelect: 'none',
						margin: 'auto',
						backgroundColor: theme.palette.background.default,
						borderRadius: '8px',
						height: '600px',
						width: '100%',
						overflowY: 'auto',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
						marginBottom: '20px',
					}}>

					<Typography variant="body4" sx={{ marginBottom: '15px', }}>
						{(index % 2 !== 0) ? "Back Side" : "Front Side"}
					</Typography>
					
					<Typography variant="h1" sx={{ whiteSpace: 'pre-wrap', }}>
						{cards.length > 0 && ((index % 2 !== 0) ? cards[Math.floor(index/2)].back : cards[Math.floor(index/2)].front)}
					</Typography>					
				</Box>

				<Box sx={{ position: "relative", width: "100%" }}>
					<Box sx={{ position: "absolute", left: 0 }}> 
						<Button variant="outlined" onClick={handleHome} startIcon={<Home/>}>
							Home
						</Button>
					</Box>

					<Box sx={{ position: "absolute", right: 0, display: 'flex', gap: 2 }}>
						<Button variant="outlined" onClick={() => console.log('Again')} disabled={true} startIcon={<ThumbDown/>}>
							Again
						</Button>
						<Button variant="outlined" onClick={() => console.log('Good')} disabled={true} startIcon={<ThumbUp/>}>
							Good 
						</Button>
					</Box>

					<Box sx={{ display: "flex", justifyContent: "center", gap: "16px", }}>
						<Button variant="contained" onClick={() => advance(1)} sx={{ minWidth:"200px" }} startIcon={ <RotateLeft/> }>
							Flip
						</Button>
					</Box>



				</Box>
				
			</Box>
		</Box>
	)
}


export default Practice

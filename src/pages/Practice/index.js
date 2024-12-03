import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect, } from 'react'
import Navbar from "../../components/Navbar";
import ClickList from '../../components/ClickList'
import { useTheme } from "@mui/material/styles";


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

	const handleBack = () => {
		navigate('/')
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "calc(100vh - 16px)",
			}}>
			<Box sx={{backgroundColor: "#fff" }}>
				<Navbar />
			</Box>
			<Box sx={{
					display: 'flex',
					alignItems: "center",
					justifyContent: "flex-start",
					backgroundColor: "#fff",
					flexDirection: "column",
					height: "100%",
					margin: '60px',
					width: "55%",
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
					}}>
					<Typography variant="body4" sx={{ marginBottom: '15px', }}>
					{(index % 2 !== 0) ? "Back Side" : "Front Side"}
					</Typography>
					<Typography variant="h1" sx={{
						whiteSpace: 'pre-wrap',
					}}>
						{cards.length > 0 && ((index % 2 !== 0) ? cards[Math.floor(index/2)].back : cards[Math.floor(index/2)].front)}
					</Typography>					
				</Box>
				<Button disableRipple variant="outlined"
					onClick={() => handleBack()} >
					Back
				</Button>
				<Button disableRipple variant="outlined"
					onClick={() => advance(-1)} >
					Prev
				</Button>
				<Button disableRipple variant="outlined"
					onClick={() => advance(1)} >
					Next
				</Button>
			</Box>
		</Box>
	)
}


export default Practice

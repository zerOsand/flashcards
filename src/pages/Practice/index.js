import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect, } from 'react';
import Navbar from "../../components/Navbar";
import { useTheme } from "@mui/material/styles";
import { useCards } from '../../state/CardProvider.js';

import RotateLeft from "@mui/icons-material/RotateLeft";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";
import Home from "@mui/icons-material/Home";

/**
 * `Practice` is a React component for practicing flashcards with feedback options.
 * 
 * @returns {JSX.Element} The practice interface for reviewing and updating card mastery.
 */
const Practice = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const theme = useTheme()
	const [cards, setCards] = useState([])
	const [index, setIndex] = useState(0)
	const [flipped, setFlipped] = useState(false);
	const [finished, setFinished] = useState(false);
	const { modifyMastery } = useCards();

	/**
	 * Shuffles the array of flashcards.
	 * 
	 * @param {Array} array - The array to shuffle.
	 * 
	 * @returns {Array} The shuffled array.
	 */
	const shuffle = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	/**
	 * Initializes the `cards` state by shuffling the cards from the location state.
	 * Runs only on the initial render.
	 */
	useEffect(() => {
		setCards(shuffle([...location.state?.cards || []]))
	}, [])

	/**
	 * Advances the current index by a specified number and updates the flipped state.
	 * 
	 * @param {number} num - The number to advance the index by; positive or negative.
	 */
	const advance = (num) => {
		let i = index + num;

		// first check if we are finished
		if (i === cards.length * 2)
			setFinished(true)
		// set i as min = 0
		if (i < 0)
			i = 0
		// set i as max = cards.length * 2 - 1
		if (i > cards.length * 2 - 1)
			i = cards.length * 2 - 1
		
		console.log(i)
		console.log(cards)

		setIndex(i)
		setFlipped((prev) => !prev);
	}

	/**
	 * Navigates the user to the home page.
	 */
	const handleHome = () => {
		navigate('/')
	}

	/**
	 * Handles feedback for a card and updates its mastery level.
	 * 
	 * @param {number} points - The points to adjust mastery by; can be -2 or 1.
	 */
	const handleFeedback = (points) => {
		modifyMastery(cards[Math.floor(index/2)].id, points);
		if (points === -2) {
			const cardIndex = Math.floor(index / 2);  
			const currentCard = cards[cardIndex];
			setCards((prevCards) => {
				const newCards = [...prevCards];
				newCards.splice(cardIndex, 1);
				newCards.push(currentCard);
				return newCards;
			});
			advance(-1);
		} else {
			advance(1);
		}
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
				{cards.length > 0 && (
					<Box sx={{
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: theme.palette.background.default,
						borderRadius: '4px',
						overflowY: 'auto',
						overflowX: 'hidden',
						alignItems: 'flex-start',
						height: '100%',
						width: '100%',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
						marginBottom: '20px',
						paddingTop: '20px',  
						paddingBottom: '20px',
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
								Front Side
							</Typography>
							<Typography variant="h1" sx={{ whiteSpace: 'pre-wrap',color: flipped ? theme.palette.primary.main : 'inherit', }}>
								{cards[Math.floor(index/2)].front || ""}
							</Typography>
							{cards.length > 0 && flipped && (
								<>
								<Box sx={{ height: '10px' }} />
								<Typography variant="body4" sx={{ marginBottom: "15px" }}>
									Back Side
							    </Typography>
							    <Typography variant="h1" sx={{ whiteSpace: "pre-wrap" }}>
								    {cards[Math.floor(index/2)].back || ""}
							    </Typography>
								</>
				            )}
						</Box>
					</Box>
				)}

				<Box sx={{ display: "flex", width: "100%", gap: 2}}>
					<Box sx={{ width: "10%", flex: 1, display: "flex", justifyContent: "flex-start" }}> 
						<Button variant="outlined" onClick={handleHome} startIcon={<Home/>} sx={{ width: "50%" }}>
							Home
						</Button>
					</Box>

					<Box sx={{ width: "70%", flex: 2, display: "flex", justifyContent: "center" }}>
						<Button variant="contained" onClick={() => advance(1)} disabled={(flipped || finished) ? true : false} sx={{ width: "60%" }} startIcon={ <RotateLeft/> }>
							Flip
						</Button>
					</Box>

					<Box sx={{ width: "10%", flex: 1, display: "flex", justifyContent: "flex-end", gap: 2 }}>
						<Button variant="outlined" onClick={() => handleFeedback(-2) } disabled={flipped ? false : true} startIcon={<ThumbDown/>} sx={{ width: "40%" }}>
							Again
						</Button>
						<Button variant="outlined" onClick={() => handleFeedback(1)} disabled={flipped ? false : true} startIcon={<ThumbUp/>} sx={{ width: "40%"}}>
							Good 
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}


export default Practice

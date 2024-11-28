import { Box, Typography, Button } from "@mui/material";
import ClickList from "../components/ClickList";
import EditCard from './editCard.js'
import Navbar from "../components/Navbar";
import PreviewPane from './preview'
import React, { useState } from "react";
import Searchbar from '../components/Searchbar'
import { useCards } from "../state/CardProvider";
import { useTheme } from "@mui/material/styles";


const MainPage = () => {
	const theme = useTheme();

	const { cards, handleExportFlashcards } = useCards();
	const [activeIndex, setActiveIndex] = useState(undefined);
	const [filteredCards, setFilteredCards] = useState(cards);
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const convertIndex = (array, target) => {
		return array.findIndex((item) => {
			return item.id === target.id;
		});
	};

	const ListCard = (card, active) => {
		return (
			<Typography
				sx={{
					fontFamily: theme.typography.fontFamily,
					fontSize: theme.typography.body1.fontSize,
					fontWeight: active ? 600 : 400,
					width: '100%',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
					userSelect: 'none',
					color:
					active
						? theme.palette.primary.main
						: theme.palette.text.primary,
				}}
			>
				{card.front}
			</Typography>
		)
	};

	const handleFilteredCardsChange = (newFilteredCards) => {
		setFilteredCards(newFilteredCards);
	};

	const togglePopup = () => setIsPopupOpen(!isPopupOpen);

	const handleCardClick = (index) => {
		// use the 'true' index
		setActiveIndex(convertIndex(cards, filteredCards[index]));
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "calc(100vh - 16px)",
			}}
		>
			{/* Navbar */}
			<Box sx={{backgroundColor: "#fff" }}>
				<Navbar />
			</Box>

			{/* Content Area */}
			<Box
				sx={{
					display: "flex",
					backgroundColor: "#fff",
				}}
			>

				{/* Sidebar */}
				<Box
					sx={{
						width: "35%",
						backgroundColor: "#f4f4f4",
						boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
						padding: "16px",
					}}
				>
					{/* Sidebar content */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '8px' }}>
						<Searchbar onFilteredCardsChange={handleFilteredCardsChange} />
						<Button disableRipple variant="outlined"
								onClick={() => console.log("practice!")} >
							Practice
						</Button>
						<Button disableRipple variant="contained"
								onClick={togglePopup} >
							+
						</Button>
					</Box>
					<ClickList
						active={(activeIndex === undefined) ?
								activeIndex :
								convertIndex(filteredCards, cards[activeIndex])} 
						list={filteredCards}
						item={ListCard}
						event={handleCardClick}
						styles={theme.cardsList}
					/>

					{isPopupOpen && (
						<EditCard
							togglePopup={togglePopup}
						/>
					)}

				</Box>

				{/* Main Content */}
				<Box
					sx={{
						width: "55%", // Adjusted width for main content
						padding: 3,
						backgroundColor: "#fff", // Match the background to the overall page
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start", // Top-align the content
						alignItems: "center",
					}}
				>
					{/* Main content */}
				</Box>
			</Box>
		</Box>
	);
};


export default MainPage;

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import ClickList from "../components/ClickList";
import { useCards } from "../state/CardProvider";
import Searchbar from '../components/Searchbar'
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
	const AddFlashcard = () => {
		return (
			<Button disableRipple variant="contained" onClick={togglePopup} >
				+
			</Button>
		);
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
				height: "100vh",
				// overflow: "hidden",
			}}
		>
			{/* Navbar */}
			<Box
				sx={{
					backgroundColor: "#fff",
					// color: "#fff",
				}}
			>
				<Navbar />
			</Box>

			{/* Content Area */}
			<Box
				sx={{
					display: "flex",
					flexGrow: 1,
					backgroundColor: "#fff", // Light gray background for entire page
				}}
			>
				{/* Sidebar */}
				<Box
					sx={{
						width: "35%", // Adjusted to match the layout
						backgroundColor: "#f4f4f4", // White background for sidebar
						boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
						padding: "16px",
						overflowY: "auto",
					}}
				>
					{/* Sidebar content */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						 {AddFlashcard()}
						<Searchbar onFilteredCardsChange={handleFilteredCardsChange} />
					</Box>
					<ClickList
						active={activeIndex}
						list={filteredCards}
						item={(flashcard, active) => (
							<Box>{flashcard.front}</Box> /* Optional customization */
						)}
						event={handleCardClick}
					/>
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
					hey3
				</Box>
			</Box>
		</Box>
	);
};

export default MainPage;

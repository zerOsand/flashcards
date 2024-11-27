import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import ClickList from "../components/ClickList";
import { useCards } from "../state/CardProvider";
import { useTheme } from "@mui/material/styles";

const MainPage = () => {
	const { cards, handleExportFlashcards } = useCards();
	const [activeIndex, setActiveIndex] = useState(undefined);
	const [filteredCards, setFilteredCards] = useState(cards);
	const [isPopupOpen, setIsPopupOpen] = useState(false);	const theme = useTheme()

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
	const AddFlashcard = () => {
		return (
			<Box
				sx={{
					backgroundColor: "#6bc879",
					color: "#fff",
					borderRadius: "8px",
					padding: "10px 16px",
					textAlign: "center",
					cursor: "pointer",
					"&:hover": { backgroundColor: "#5aa96a" },
				}}
				onClick={togglePopup}
			>
				+
			</Box>
		);
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
			<Box sx={{backgroundColor: "#fff"}}>
				<Navbar />
			</Box>

			{/* Content Area */}
			<Box
				sx={{
					display: "flex",
					flexGrow: 1,
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
						overflowY: "auto",
					}}
				>
					{/* Sidebar content */}
					<ClickList
						active={(activeIndex === undefined) ?
								activeIndex :
								convertIndex(filteredCards, cards[activeIndex])} 
						list={filteredCards}
						item={ListCard}
						event={handleCardClick}
						styles={theme.cardsList}
						prependItem={AddFlashcard}
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

import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import ClickList from "../components/ClickList";
import { useCards } from "../state/CardProvider";

const MainPage = () => {
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
					<ClickList
						active={activeIndex}
						list={filteredCards}
						item={(flashcard, active) => (
							<Box>{flashcard.front}</Box> /* Optional customization */
						)}
						event={handleCardClick}
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

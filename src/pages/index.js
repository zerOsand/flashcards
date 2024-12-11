import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import ClickList from "../components/ClickList";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import EditCard from './editCard.js';
import Navbar from "../components/Navbar";
import PreviewPane from './preview';
import React, { useState } from "react";
import Searchbar from '../components/Searchbar';
import { useCards } from "../state/CardProvider";
import { useTheme } from "@mui/material/styles";

/**
 * `Home` is the main landing page component that displays a list of flashcards, provides options for importing/exporting
 * flashcards, and includes a preview pane and search functionality.
 * 
 * @returns {JSX.Element} The homepage layout with sidebar, flashcard list, and preview area.
 */
const Home = () => {
	const navigate = useNavigate()
	const theme = useTheme();

	const { cards, handleExportFlashcards, handleImportFlashcards } = useCards();
	const [activeIndex, setActiveIndex] = useState(undefined);
	const [filteredCards, setFilteredCards] = useState(cards);
	const [open, setOpen] = useState(false)

	/**
	 * Finds the index of a card in the full card array by comparing its ID.
	 * 
	 * @param {Array} array - The array of all cards.
	 * @param {Object} target - The card object whose index is to be found.
	 * @returns {number} The index of the card in the array.
	 */
	const convertIndex = (array, target) => {
		return array.findIndex((item) => {
			return item.id === target.id;
		});
	};

	/**
	 * Contains styles for the card list and items.
	 * 
	 * @returns {Object} Style definitions for list and grid elements.
	 */
	const cardsStyles = {
		container: {
			padding: '8px',
			height: '100%',
			overflowY: 'auto',
		},
		grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)',
			gap: '8px',
		},
		item: (index, active) => ({
			borderRadius: '4px',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			backgroundColor:
			index === active
				? theme.palette.accent.main
				: theme.palette.background.paper,
			border: `2px solid ${
					index === active
						&& theme.palette.accent.border
					}`,
			height: '75px',
			overflow: 'hidden',
			boxSizing: 'border-box',
			boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
			textAlign: "center",
			transition: "all 0.3s ease",
			"&:hover": {
				backgroundColor: theme.palette.background.default,
			},
		}),
	};

	/**
	 * Renders a list item for a flashcard with dynamic styling based on its active status.
	 * 
	 * @param {Object} card - The card data.
	 * @param {boolean} active - Whether the card is active.
	 * @returns {JSX.Element} A Typography component displaying the card front with appropriate styling.
	 */
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

	/**
	 * Updates the list of filtered cards based on the search query.
	 * 
	 * @param {Array} newFilteredCards - The new list of filtered cards to display.
	 * @returns {void}
	 */
	const handleFilteredCardsChange = (newFilteredCards) => {
		setFilteredCards(newFilteredCards);
	};

	/**
	 * Handles the click event on a card in the list, setting the active card index.
	 * 
	 * @param {number} index - The index of the clicked card in the filtered list.
	 * @returns {void}
	 */
	const handleCardClick = (index) => {
		// use the 'true' index
		setActiveIndex(convertIndex(cards, filteredCards[index]));
	};

	/**
	 * Navigates to the practice page, passing the filtered cards as state.
	 * 
	 * @returns {void}
	 */
	const handlePractice = () => {
		navigate('/practice', { state: {cards: filteredCards} })
	}

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
					flexGrow: 1,
					overflow: "hidden",
					}}
			>

				{/* Sidebar */}
				<Box
					sx={{
						width: "35%",
						backgroundColor: "#f4f4f4",
						boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
						padding: "16px",
						display: "flex",
						flexGrow: 1,
						flexDirection: 'column',
					}}
				>
					{/* Sidebar content */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px', }}>
					    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30px', }}>
							
							
							<Tooltip title="Import Flashcards" arrow placement="top">
								<Button
									size="small"
									variant="standard"
									sx={{ padding: '1px 2px', fontSize: '0.50rem', minWidth: '20px' }}
									disableRipple
									onClick={() => console.log("import!")}
									component = "label"	// Opens file upload prompt for input
								>
									<UploadIcon fontSize="small" sx={{
											color: 'black',
											transition: 'color 0.3s ease, color 0.3s ease',
											'&:hover': {
												color: theme.palette.accent.border,
											},
										}} />
									<input
										type="file"
										accept="application/json"
										hidden
										onChange={handleImportFlashcards} 
									/>
								</Button>
							</Tooltip>

							<Tooltip title="Export Flashcards" arrow>
								<Button
									size="small"
									variant="standard"
									sx={{ padding: '1px 2px', fontSize: '0.50rem', minWidth: '20px', }}
									disableRipple
									onClick={() => handleExportFlashcards(filteredCards)}
								>
									<DownloadIcon fontSize="small" sx={{ 
											color: 'black',
											transition: 'color 0.3s ease, color 0.3s ease',
											'&:hover': {
												color: theme.palette.accent.border,
											},
										}} />
								</Button>
							</Tooltip>
							
					    </Box>
						<Searchbar onFilteredCardsChange={handleFilteredCardsChange} />
						<Button disableRipple variant="outlined"
								onClick={() => handlePractice()}
								disabled={filteredCards.length === 0} >
							Practice
						</Button>
						<Button disableRipple variant="contained"
								onClick={(e) => setOpen(true)}
								data-testid="add-card">
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
						styles={cardsStyles}
					/>

					 <EditCard popupState={{open, setOpen}} />

				</Box>

				{/* Main Content */}
				<Box
					sx={{
						display: 'flex',
						alignItems: "center",
						justifyContent: "flex-start",
						backgroundColor: "#fff",
						flexDirection: "column",
						height: "100%",
						margin: '60px',
						width: "55%",
					}}
				>
					<PreviewPane index={{activeIndex, setActiveIndex}} />
				</Box>
			</Box>
		</Box>
	);
};


export default Home

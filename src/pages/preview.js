import { Box, Typography, Button } from "@mui/material";
import ClickList from '../components/ClickList';
import ConfirmationPopup from './confirmPopup.js';
import EditCard from './editCard.js';
import { useCards } from '../state/CardProvider.js';
import { useState, useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import EditIcon from '@mui/icons-material/Edit';
import { useSearch } from '../components/Searchbar/SearchContext.js';

/**
 * `PreviewPane` is a React component that handles the rendering of the flashcards.
 *
 * @param {number} tagIndex - The index of the tag clicked.
 */
const PreviewPane = ({ index })  => {
	const theme = useTheme();
	const {activeIndex, setActiveIndex} = index
	const { cards, removeCard } = useCards();
	const [flipped, setFlipped] = useState(false)
	const [open, setOpen] = useState(false)
	const [removeOpen, setRemoveOpen] = useState(false)
	const { searchTerm, setSearchTerm } = useSearch()

	const handleTagClick = (tagIndex) => {
		setSearchTerm((prev) => {
			const trimmedPrev = prev.trimEnd();
			const newTag = cards[activeIndex].tags[tagIndex]
	
			// Check if search is empty
			if (trimmedPrev.length === 0) {
				return newTag;
			}
			
			// Else append the new tag
			return `${trimmedPrev} ${/[\^&|]$/.test(trimmedPrev) ? '' : '| '}${newTag}`; 
		});
	};

	/**
	 * Runs every time the `activeIndex` changes. Resets the flipped state to false.
	 */
	useEffect(() => {
        setFlipped(false);
    }, [activeIndex]);

	/**
	 * Confirms the removal of a card. If the active card is the last one, it clears the active index.
	 * Closes the remove confirmation dialog.
	 */
	const handleRemoveConfirm = () => {
		removeCard(activeIndex);
		if (activeIndex >= cards.length - 1)
			setActiveIndex(undefined);
		setRemoveOpen(false)
	}

	/**
	 * Renders a tag box component with special styling for specific tags.
	 * 
	 * @param {string} text - The tag text to display.
	 * @returns {JSX.Element} A box containing the tag text.
	 */
	const TagBox = (text) => {
		const special = text === 'learning'
		return (
				<Box sx = {{ display: 'flex',
							 borderRadius: '4px',
							 alignItems: 'center',
						   	 padding: '2px 10px',
						   	 flexShrink: 0,
							 backgroundColor: special
							 ? theme.palette.accent.main
							 : theme.palette.accent.light,
							 }}>
					<Typography
						sx={{
						fontFamily: theme.typography.fontFamily,
						fontSize: theme.typography.body1.fontSize,
						fontWeight: 400,
						whiteSpace: 'nowrap',
						color: theme.palette.text.primary,
					}}
				>
					{text}
				</Typography>
			</Box>
		)
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '90%',
					height: '80%',
					cursor: 'default',
					borderRadius: '20px',
					border: `2px solid ${
						theme.palette.secondary.main
					}`,
					backgroundColor: theme.palette.background.paper, 
					boxSizing: 'border-box',
					padding: '20px',
				}}
			>
				<Box sx={{
						display: 'flex',
						justifyContent: 'center',
						borderRadius: '4px',
						backgroundColor: theme.palette.background.default,
						overflowY: 'auto',
						overflowX: 'hidden',
						marginBottom: '40px',
						alignItems: 'flex-start',
						height: '100%',
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
						{activeIndex !== undefined && (
							<Typography variant="body4" sx={{ marginBottom: '15px', }}>
								{flipped ? "Back Side" : "Front Side"}
							</Typography>
						)}
							<Typography variant="h1" sx={{
								whiteSpace: 'pre-wrap',
							}}>
								{activeIndex === undefined
							 	? "Select a card for preview."
							 	: (flipped ? cards[activeIndex].back : cards[activeIndex].front)}
							</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						height: '140px',
					}}>
				<Typography variant="h3">
					Tags
				</Typography>
				{activeIndex !== undefined && <ClickList
					list={cards[activeIndex].tags}
					item={TagBox}
					event={handleTagClick}
					styles={theme.tagList}
				 />}
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: 2,
					width: '90%',
				}}>
				<Button
					variant="contained"
					startIcon={<RotateLeftIcon />}
					disableRipple
					sx={{ flex: '1 1 80%', marginRight: 2, }}
					onClick={() => setFlipped(!flipped)}
					disabled={activeIndex === undefined}
				>
					Flip
				</Button>
				<Button
					variant="outlined"
					disableRipple
					sx={{ flex: '1 1 10%', marginRight: 2, }}
					onClick={(e) => setOpen(true)}
					disabled={activeIndex === undefined}
				>
					<EditIcon />
				</Button>
				<EditCard popupState={{open, setOpen}} card={cards[activeIndex]} />
				<Button
					variant="outlined"
					disableRipple
					sx={{ flex: '1 1 10%', }}
					onClick={() => setRemoveOpen(true)}
					disabled={activeIndex === undefined}
				>
					<DeleteIcon />
				</Button>
				<ConfirmationPopup
					open={removeOpen}
					onCancel={() => setRemoveOpen(false)}
					onConfirm={() => handleRemoveConfirm()}
					message={`Delete
							${cards[activeIndex]?.front}?`}/>

			</Box>
		</>
	)
}


export default PreviewPane

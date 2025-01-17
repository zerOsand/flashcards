import { useState, useEffect, } from 'react';
import DefaultPopup from '../components/Popup';
import Selector from './Selector';
import { useCards } from '../state/CardProvider.js';
import { Button, TextField, Typography, Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";

/**
 * `EditCard` is a React component that renders a popup for editing or creating a flashcard with front, back, and tags.
 * 
 * @param {Object} popupState - The state of the popup (open/close).
 * @param {Object} card - The card to edit or null for creating a new one.
 * 
 * @returns {JSX.Element} A `DefaultPopup` component with a form for editing/creating a flashcard.
 */
const EditCard = ({popupState, card}) => {
	const {open, setOpen} = popupState
	const theme = useTheme(); 

	const { addCard, editCard } = useCards();
	const [cardState, setCardState] = useState({
		id: card?.id ?? null,
		front: card?.front ?? '',
		back: card?.back ?? '',
		tags: card?.tags ?? [],
	});

	/**
	 * Updates the card state when the `card` prop changes.
	 * 
	 * @param {Object} card - The new card data.
	 */
    useEffect(() => {
        if (card) {
            setCardState({
				id: card?.id ?? null,
				front: card?.front ?? '',
				back: card?.back ?? '',
				tags: card?.tags ?? [],
            });
        }
    }, [card]);

	// Check if both front and back fields are filled to enable the save button
	const isSaveEnabled = cardState.front.trim() !== "" && cardState.back.trim() !== "";

    /**
     * Handles saving the card, either adding a new card or editing an existing one.
     */
	const handleSave = () => {
		const id = cardState.id;
		const front = cardState.front.trim();
		const back = cardState.back.trim();
		if (front && back) {
			if (id)
				editCard(id, front, back, cardState.tags)
			else
				addCard(front, back, cardState.tags)
			setOpen(false)
		}
		setCardState({ id: null, front: '', back: '', tags: cardState.tags})
	};

	return (
		<DefaultPopup
			open={open}
			onClose={(e) => {setOpen(false)}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: theme.typography.fontFamily, color: theme.palette.text.primary }}>
					{cardState.id ? 'Edit' : 'Create'} Flashcard
				</Typography>

				<Box
					sx={{ display: 'flex', width: '600px', height: '280px', mb: '15px', }}
				>
					<Box
						sx={{
							flex: '0 0 55%',
							display: 'flex',
							flexDirection: 'column',
							marginRight: '10px',
						}}
						>
						<Box sx={{ flex: 1, marginBottom: '10px', }}>
							<Typography variant="body3" sx={{ fontWeight: 'bold' }}>
								Front
							</Typography>
							<TextField
								fullWidth
								multiline
								variant="filled"
								rows={4}
								value={cardState.front}
								onChange={(e) => setCardState((prev) => ({ ...prev, front: e.target.value }))}
								placeholder="Front of Flashcard"
								data-testid="front-text"
							/>
						</Box>

						<Box sx={{ flex:1, marginBottom: '10px',}}>
							<Typography variant="body3" sx={{ fontWeight: 'bold'}}>
								Back
							</Typography>
							<TextField
								fullWidth
								multiline
								variant="filled"
								rows={4}
								value={cardState.back}
								onChange={(e) => setCardState((prev) => ({ ...prev, back: e.target.value }))}
								placeholder="Back of Flashcard"
								data-testid="back-text"
							/>
						</Box>
					</Box>

					<Box sx={{  flex: '0 0 45%',
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Box sx={{ flex:1,}}>
							<Typography variant="body3" sx={{ fontWeight: 'bold', }}>
								Tags
							</Typography>
						</Box>
						<Box sx={{ backgroundColor: "#f4f4f4", borderRadius: '8px', height: '100%', }}>
							<Selector
								onAdd={(e) => { setCardState((p) => ({ ...p, tags: [...p.tags, e]}))}}
								onRemove={(e) => { setCardState((p) => ({ ...p, tags: p.tags.filter(tag => !e.includes(tag))}))}}
								utags={cardState.tags}
							/>
						</Box>
					</Box>
				</Box>

				<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems:'center', mt:2}}>
					<Button disableRipple variant="outlined" onClick={() => setOpen(false)} sx={{fontSize: '0.875rem',padding: '6px 12px', marginRight: '8px', }}> Cancel </Button>
					<Button disableRipple variant="contained" onClick={() => handleSave()} disabled={!isSaveEnabled} sx={{fontSize: '0.875rem',padding: '6px 12px', marginRight: '8px'}}> Save </Button>
				</Box>	
			</Box>
        </DefaultPopup>
	)
};


export default EditCard;

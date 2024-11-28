import { useState } from 'react'
import DefaultPopup from '../components/Popup'
//import CustomButton from '../components/CustomButton'
import ConfirmationPopup from './confirmPopup'
import Selector from './Selector'
//import { defaultPopupStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'
import { Button, TextField, Typography, Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";

const EditCard = ({popupState, card}) => {
	const {open, setOpen} = popupState
	const [copen, setCopen] = useState(false)
	const theme = useTheme(); 

	const { addCard, editCard } = useCards();
	const [cardState, setCardState] = useState({
		id: card?.id ?? null,
		front: card?.front ?? '',
		back: card?.back ?? '',
		tags: card?.tags ?? [],
	});

	const isSaveEnabled = cardState.front.trim() !== "" && cardState.back.trim() !== "";

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
	};
	const handleCancelConfirm = () => {
		setCopen(false)
		setOpen(false)
	};

	return (
		<DefaultPopup
			open={open}
			onClose={(e) => {setCopen(true)}}
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
                sx={{
                    flex: 1, 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1, 
					overflow:'hidden'
                }}
                >
			<Box sx={{ flex: 1, overflow:'hidden', marginBottom: '10px'}}>
				<Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Front
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={cardState.front}
                    onChange={(e) => setCardState((prev) => ({ ...prev, front: e.target.value }))}
                    placeholder="Front of Flashcard"
                />
			</Box>
			

			<Box sx={{ flex:1, overflow:"hidden", marginBottom: '10px',}}>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold'}}>
                    Back
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={cardState.back}
                    onChange={(e) => setCardState((prev) => ({ ...prev, back: e.target.value }))}
                    placeholder="Back of Flashcard"
                />
            </Box>

			<Box>
			<Selector
				onAdd={(e) => { setCardState((p) => ({ ...p, tags: [...p.tags, e]}))}}
				onRemove={(e) => { setCardState((p) => ({ ...p, tags: p.tags.filter(tag => tag !== e)}))}}
				tags={cardState.tags}
			/>
			</Box>
		</Box>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems:'center', mt:2}}>
				<Button disableRipple variant="outlined" onClick={() => setCopen(true)} sx={{fontSize: '0.875rem',padding: '6px 12px', marginRight: '8px', }}> Cancel </Button>
				<Button disableRipple variant="contained" onClick={() => handleSave()} disabled={!isSaveEnabled} sx={{fontSize: '0.875rem',padding: '6px 12px', marginRight: '8px'}}> Save </Button>
			</Box>	
			<ConfirmationPopup
				open={copen}
				onCancel={() => setCopen(false)}
				onConfirm={() => handleCancelConfirm()}
				message='Discard Edits?'/>
			</Box>
		</DefaultPopup>
	)
};


export default EditCard;

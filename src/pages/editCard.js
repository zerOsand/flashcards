import { useState } from 'react'
import DefaultPopup from '../components/Popup'
import CustomButton from '../components/CustomButton'
import ConfirmationPopup from './confirmPopup'
import Selector from './Selector'
import { defaultPopupStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'

const EditCard = ({popupState, card}) => {
	const {open, setOpen} = popupState
	const [copen, setCopen] = useState(false)
	let styles = defaultPopupStyle

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
	}

	return (
		<DefaultPopup
			open={open}>
			<div style={styles.overlay}>
				<div style={styles.modal}>
					<h2>{cardState.id ? "Edit" : "Create"} Flashcard</h2>
					<div style={styles.inputContainer}>
						<label style={styles.label}>Front</label>
						<textarea
							style={styles.textarea}
							value={cardState.front}
							onChange={(e) => { setCardState((p) => ({ ...p, front: e.target.value}))}}
							placeholder="Front of Flashcard"/>
					</div>

					<div style={styles.inputContainer}>
						<label style={styles.label}>Back</label>
						<textarea
							style={styles.textarea}
							value={cardState.back}
							onChange={(e) => { setCardState((p) => ({ ...p, back: e.target.value}))}}
							placeholder="Back of Flashcard"/>
					</div>

					<div style={styles.buttonContainer}>
						<CustomButton text="Cancel" event={() => setCopen(true)} stylesOverride={{backgroundColor: '#b53550'}}/>
						<CustomButton text="Save" event={() => handleSave()} stylesOverride={{backgroundColor: isSaveEnabled ? '#6bc879' : 'gray'}}/>
					</div>	
					<ConfirmationPopup
						open={copen}
						onCancel={() => setCopen(false)}
						onConfirm={() => handleCancelConfirm()}
						message='Discard Edits?'/>
				</div>
			</div>
		</DefaultPopup>
	)
};


export default EditCard;

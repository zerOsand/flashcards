import { useState } from 'react'
import DefaultPopup from '../components/Popup'
import CustomButton from '../components/CustomButton'
import ConfirmationPopup from './confirmPopup'
import Selector from './Selector'
import { defaultPopupStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'

const EditCard = ({togglePopup, card, styles}) => {
	styles = styles || defaultPopupStyle

	const { addCard, editCard } = useCards();
	const [cardState, setCardState] = useState({
		id: card?.id ?? null,
		front: card?.front ?? '',
		back: card?.back ?? '',
		tags: card?.tags ?? [],
	});

	const isSaveEnabled = cardState.front.trim() !== "" && cardState.back.trim() !== "";

	const [showCancel, setShowCancel] = useState(false);

	const handleSave = () => {
		const id = cardState.id;
		const front = cardState.front.trim();
		const back = cardState.back.trim();
		if (front && back) {
			if (id)
				editCard(id, front, back, cardState.tags)
			else
				addCard(front, back, cardState.tags)
			togglePopup()
		}
	};

	return (
		<DefaultPopup
			onClose={togglePopup}>
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

					<Selector
						onAdd={(e) => { setCardState((p) => ({ ...p, tags: [...p.tags, e]}))}}
						onRemove={(e) => { setCardState((p) => ({ ...p, tags: p.tags.filter(tag => tag !== e)}))}}
						tags={cardState.tags}
					/>

					<div style={styles.buttonContainer}>
						<CustomButton text="Cancel" event={() => setShowCancel(true)} stylesOverride={{backgroundColor: '#b53550'}}/>
						<CustomButton text="Save" event={() => handleSave()} stylesOverride={{backgroundColor: isSaveEnabled ? '#6bc879' : 'gray'}}/>
					</div>	
					{showCancel && <ConfirmationPopup onConfirm={togglePopup} onClose={() => setShowCancel(false)} message="Are you sure you want to cancel?"/>}
				</div>
			</div>
		</DefaultPopup>
	)
};


export default EditCard;

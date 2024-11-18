import { useState } from 'react'
import DefaultPopup from '../components/Popup'
import CustomButton from '../components/CustomButton'
import ConfirmationPopup from './confirmPopup'
import Selector from '../components/Selector'
import { defaultPopupStyle, textTagStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'

const EditCard = ({togglePopup, card, styles}) => {
	styles = styles || defaultPopupStyle

	const { addCard, editCard, getTags } = useCards();
	const [cardState, setCardState] = useState({
		id: card?.id ?? null,
		front: card?.front ?? '',
		back: card?.back ?? '',
		tags: card?.tags ?? [],
	});

	const isSaveEnabled = cardState.front.trim() !== "" && cardState.back.trim() !== "";

	// temporary --- bd 11/15
	const TagBox = (text) => {
		return (
				<div style={{ ...textTagStyle, ...{minWidth: '200px'}}}>
					{text}
				</div>
		);
	}

	const getMissingTags = () => {
		return getTags().filter((tag) =>
			!cardState.tags.includes(tag))
	}

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
					<h2>Create Flashcard</h2>
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
						onSelect={(e) => { setCardState((p) => ({ ...p, tags: [...p.tags, e]}))}}
						item={TagBox}
						entries={getMissingTags()}
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

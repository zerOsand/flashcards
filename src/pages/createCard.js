import { useState } from 'react'
import DefaultPopup from '../components/Popup'
import CustomButton from '../components/CustomButton'
import Selector from '../components/Selector'
import { defaultPopupStyle, textTagStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'

const CreateCard = ({ isPopupOpen, togglePopup, styles}) => {
    styles = styles || defaultPopupStyle
	
	const { addCard, getTags } = useCards();
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
	const [tags, setTags] = useState([]);

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
			!tags.includes(tag))
	}

    const handleSave = () => {
        if (front.trim() && back.trim()) {
            addCard(front.trim(), back.trim(), tags);
            togglePopup();
        }
    };

    return (
        <DefaultPopup 
            isOpen={isPopupOpen} 
            onClose={togglePopup}>
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <h2>Create Flashcard</h2>
                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Front</label>
                        <textarea 
                            style={styles.textarea} 
                            value={front}
                            onChange={(e) => setFront(e.target.value)}/>
                    </div>

                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Back</label>
                        <textarea 
                            style={styles.textarea} 
                            value={back}
                            onChange={(e) => setBack(e.target.value)}/>
                    </div>

					<Selector
						onSelect={(e) => setTags([...tags, e])}
						item={TagBox}
						entries={getMissingTags()}
					/>

                    <div style={styles.buttonContainer}>
                        <CustomButton text="Cancel" event={togglePopup} /* TODO #15; confirm cancel */ stylesOverride={{backgroundColor: '#b53550'}}/>
                        <CustomButton text="Save" event={handleSave} stylesOverride={{backgroundColor: '#6bc879'}}/>
                    </div>

                </div>
            </div>
        </DefaultPopup>
    )
};


export default CreateCard;

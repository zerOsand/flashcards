import { useState } from 'react'
import DefaultPopup from '../components/Popup'
import CustomButton from '../components/CustomButton'
import ConfirmationPopup from './confirmPopup'
import Selector from '../components/Selector'
import { defaultPopupStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'

const CreateCard = ({ isPopupOpen, togglePopup, styles}) => {
    styles = styles || defaultPopupStyle
	
	const { addCard, getTags } = useCards();
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
	const [tags, setTags] = useState([]);

    const isSaveEnabled = front.trim() !== "" && back.trim() !== "";

	const getMissingTags = () => {
		return getTags().filter((tag) =>
			!tags.includes(tag))
	}

    const [showCancel, setShowCancel] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSave = () => {
        if (front.trim() && back.trim()) {
            addCard(front.trim(), back.trim(), tags);
            togglePopup();
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
                            value={front}
                            onChange={(e) => setFront(e.target.value)}
                            placeholder="Front of Flashcard"/>
                    </div>

                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Back</label>
                        <textarea 
                            style={styles.textarea} 
                            value={back}
                            onChange={(e) => setBack(e.target.value)}
                            placeholder="Back of Flashcard"/>
                    </div>

					<Selector
						onSelect={(e) => setTags([...tags, e])}
						entries={getMissingTags()}
					/>

                    <div style={styles.buttonContainer}>
                        <CustomButton text="Cancel" event={() => setShowCancel(true)} stylesOverride={{backgroundColor: '#b53550'}}/>
                        <CustomButton text="Save" event={() => handleSave()} stylesOverride={{backgroundColor: isSaveEnabled ? '#6bc879' : 'gray'}}/>
                    </div>  
                    {showCancel && <ConfirmationPopup onConfirm={togglePopup} onClose={() => setShowCancel(false)} message="Are you sure you want to cancel?"/>}
                    {showConfirm && <ConfirmationPopup onConfirm={() => handleSave()} onClose={() => setShowConfirm(false)} message="Would you like to save your changes?"/>}
                </div>
            </div>
        </DefaultPopup>
    )
};

export default CreateCard;

import { useState } from 'react'
import DefaultPopup from '../components/Popup'
import CustomButton from '../components/CustomButton'
import { createFlashcardStyle } from '../utils/styles'
import ConfirmationPopup from './confirmPopup'

const CreateCard = ({ togglePopup, addCard, styles }) => {
    styles = styles || createFlashcardStyle

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const [showCancel, setShowCancel] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSave = () => {
        if (front.trim() && back.trim()) {
            addCard(front.trim(), back.trim());
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
                            onChange={(e) => setFront(e.target.value)}/>
                    </div>

                    <div style={styles.inputContainer}>
                        <label style={styles.label}>Back</label>
                        <textarea 
                            style={styles.textarea} 
                            value={back}
                            onChange={(e) => setBack(e.target.value)}/>
                    </div>

                    <div style={styles.buttonContainer}>
                        <CustomButton text="Cancel" event={() => setShowCancel(true)} stylesOverride={{backgroundColor: '#b53550'}}/>
                        <CustomButton text="Save" event={() => setShowConfirm(true)} stylesOverride={{backgroundColor: '#6bc879'}}/>
                    </div>  
                    {showCancel && <ConfirmationPopup onConfirm={togglePopup} onClose={() => setShowCancel(false)} message="Are you sure you want to cancel?"/>}
                    {showConfirm && <ConfirmationPopup onConfirm={() => handleSave()} onClose={() => setShowConfirm(false)} message="Would you like to save your changes?"/>}
                </div>
            </div>
        </DefaultPopup>
    )
};

export default CreateCard;
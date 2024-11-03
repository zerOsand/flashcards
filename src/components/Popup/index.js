import React, { useState } from 'react';
import { styles } from './popupElements'
import CustomButton from '../CustomButton'

function CreatePopup({ onClose, addFlashcard }) {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleSave = () => {
        if (front.trim() && back.trim()) {
            const newFlashcard = {
                value: front.trim(),
                text: back.trim(),
                tags: [],
            };
            addFlashcard(newFlashcard);
            onClose();
        }
    };

    return (
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
					<CustomButton text="Cancel" event={onClose} /* TODO #15; confirm cancel */ stylesOverride={{backgroundColor: '#b53550'}}/>
					<CustomButton text="Save" event={handleSave} stylesOverride={{backgroundColor: '#49a658'}}/>
				</div>

            </div>
        </div>
    );
};

export default CreatePopup;

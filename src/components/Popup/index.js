import React, { useState } from 'react';
import { styles } from './popupElements'

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
                    <button onClick={onClose} /* TODO #15; confirm cancel */ style={styles.cancelButton}>Cancel</button>
                    <button onClick={handleSave} style={styles.saveButton}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePopup;
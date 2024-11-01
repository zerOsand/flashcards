import React, { useState } from 'react';
import { styles } from './createFlashcardElements'
import ConfirmationPopup from '../Confirmation';
import { handleOpenPopup, handleClosePopup } from '../HandlePopups'

function CreateFlashcard({ onClose, addFlashcard }) {

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const [showCancel, setShowCancel] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
                    <button onClick={() => handleOpenPopup(setShowCancel)} style={styles.cancelButton}>Cancel</button>
                    <button onClick={() => handleOpenPopup(setShowConfirm)} style={styles.saveButton}>Save</button>
                </div>
                {showCancel && <ConfirmationPopup message="Do you want to cancel?" onConfirm={() => onClose()} onClose={() => handleClosePopup(setShowCancel)}/>}
                {showConfirm && <ConfirmationPopup message="Would you like to save your changes?" onConfirm={() => handleSave()} onClose={() => handleClosePopup(setShowConfirm)}/>}
            </div>
        </div>
    );
};

export default CreateFlashcard;
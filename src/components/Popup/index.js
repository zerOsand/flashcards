import React from 'react';

import { styles } from './popupElements'

function CreatePopup({ onClose }) {
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Create Flashcard</h2>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Front</label>
                    <textarea style={styles.textarea} />
                </div>

                <div style={styles.inputContainer}>
                    <label style={styles.label}>Back</label>
                    <textarea style={styles.textarea} />
                </div>

                <div style={styles.buttonContainer}> 
                    <button onClick={onClose} /* TODO #15; confirm cancel */ style={styles.cancelButton}>Cancel</button>
                    <button /* TODO #14 & TODO #15; confirm save */ style={styles.saveButton}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePopup;
import React from 'react';
import { styles } from '../CreateFlashcard/createFlashcardElements'; // Adjust the import based on your styles

const ConfirmationPopup = ({ message, onConfirm, onClose }) => {

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Confirmation</h2>
                <p>{message}</p>
                <div style={styles.buttonContainer}>
                    <button onClick={onClose} style={styles.cancelButton}>No</button>
                    <button onClick={handleConfirm} style={styles.saveButton}>Yes</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
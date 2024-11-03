import React from 'react';

import { styles } from './popupElements'
import CustomButton from '../CustomButton'

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
					<CustomButton text="Cancel" event={onClose} stylesOverride={{backgroundColor: '#b53550'}}/>
					<CustomButton text="Save" event={console.log("save!")} stylesOverride={{backgroundColor: '#49a658'}}/>
				</div>
			</div>
		</div>
	);
}

export default CreatePopup;

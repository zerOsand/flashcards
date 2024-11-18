import DefaultPopup from "../components/Popup";
import CustomButton from "../components/CustomButton";
import { defaultPopupStyle } from "../utils/styles";

const ConfirmationPopup = ({ onConfirm, onClose, message, styles }) => {

	styles = styles || defaultPopupStyle

	return (
		<DefaultPopup onClose={onClose}>
			<div style={styles.overlay}>
				<div style={styles.modal}>
					<h2>Confirmation</h2>
					<p>{message}</p>
					<div style={styles.buttonContainer}>
						<CustomButton text="No" event={onClose} stylesOverride={{backgroundColor: '#b53550'}}></CustomButton>
						<CustomButton text="Yes" event={onConfirm} stylesOverride={{backgroundColor: '#6bc879'}}>Yes</CustomButton>
					</div>
				</div>
			</div>
		</DefaultPopup>
	);


};

export default ConfirmationPopup;

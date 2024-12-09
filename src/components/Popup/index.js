import { Modal, Box } from '@mui/material/';
import React from 'react';

/**
 * Default styles.
 * These styles can be overridden by the `style` prop.
 */
const defaultStyle = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backdropFilter: 'blur(5px)',
	},

	modal: {
		backgroundColor: 'white',
		padding: '20px',
		borderRadius: '8px',
		textAlign: 'center',
	},
}

/**
 * `DefaultPopup` is a modal component that displays content in a customizable popup window. 
 * 
 * @param {Object} props - The props for the `DefaultPopup` component.
 * @param {boolean} open - Controls whether the modal is open or closed.
 * @param {function} onClose - Function to call when the modal is closed (usually by clicking the overlay).
 * @param {Object} [style] - Optional custom styles for the overlay and modal box.
 * @param {ReactNode} children - The content to display inside the modal (text, forms, etc.).
 * 
 * @returns {JSX.Element} A modal popup with a dark overlay and a centered modal box containing the passed content.
 */
const DefaultPopup = ({ open, onClose, style, children }) => {
	style = style || defaultStyle
	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Box sx={style.overlay} onClick={onClose}>
				<Box sx={style.modal} onClick={(e) => e.stopPropagation()}>
					{children}
				</Box>
			</Box>
		</Modal>
	);
};

export default DefaultPopup;

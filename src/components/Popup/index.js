import { Modal, Box } from '@mui/material/';
import React from 'react';

const style = {
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
		width: '500px',
		backgroundColor: 'white',
		padding: '20px',
		borderRadius: '8px',
		textAlign: 'center',
		boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)'
	},
}

function DefaultPopup({ open, onClose, children }) {
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

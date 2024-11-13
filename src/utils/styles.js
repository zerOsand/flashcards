export const pageStyle = {
	padding: '1vw',
}

export const contentArea = {
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	marginTop: '20px',
	borderStyle: 'solid',
	borderRadius: '4px',
	overflow: 'hidden',
};

export const contentContainer = {
	display: 'flex',
	flexDirection: 'column',
	height: 'calc(100vh - 60px)',
	padding: 0,
	overflow: 'hidden',
};

export const searchBarStyle = {
	margin: '3px',
	display: 'flex',
};

export const container = {
	display: 'flex',
	overflow: 'hidden',
};

export const leftContainer = {
	flex: '1 0 40%',
	overflow: 'auto',
	padding: '10px',
};

export const rightContainer = {
	flex: '1 0 60%',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: '#f8f8f8',
	justifyContent: 'center',
	alignItems: 'center',
};

export const previewStyles = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	item: {
		flex: '0 0 calc(100% / 2 - 5px)', // items/spacing per row
		marginBottom: '15px',
		borderStyle: 'solid',
		borderRadius: '4px',
		borderWidth: 'thin',
		background: '#e0e0e0',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '75px',
		overflow: 'hidden',
		boxSizing: 'border-box',
	},
	active_item: {
		background: '#3366ff',
		color: '#000',
		borderWidth: 'medium',
	},
};

export const tagStyles = {
	container: {
		display: 'flex',
		margin: '4px',
	},
	item: {
		backgroundColor: '#3366ff',
		padding: '3px 3px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		marginRight: '2px',
	},
	active_item: {
	},
}

export const cardPaneStyle = {
	front: {
		borderStyle: 'solid',
		borderRadius: '6px',
		background: '#fff',
		height: '60%',
		width: '80%',
		display: 'flex',
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		overflowY: 'auto',
		overflowX: 'hidden',
		wordWrap: 'break-word',
		overflowWrap: 'break-word',
		hyphens: 'auto',
		userSelect: 'none'
	},
	back: {
		background: '#f0f0f0',
		userSelect: 'none'
	}
};

export const textListStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.2rem)',
	lineHeight: '1.2',
	overflow: 'hidden',
}

export const textPreviewStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.5rem)',
	lineHeight: '1.2',
	margin: 'auto',
	whiteSpace: 'pre-wrap',
}

export const textTagStyle = {
	fontSize: 'clamp(0.8rem, 4vw, 0.3rem)',
	lineHeight: '1.0',
	color: 'white',
	overflow: 'hidden',
}

export const createFlashcardStyle = {
// --- blur the background
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

// --- design the modal for the popup
	modal: {
		backgroundColor: 'white',
		padding: '20px',
		borderRadius: '8px',
		maxWidth: '500px',
		width: '100%',
		textAlign: 'center',
	},

// --- styles for the content inside of the modal

	// this is for the text areas (front and back); just make the padding to look nice
	inputContainer: {
		marginBottom: '20px', 
	},
	
	// this is to keep the text above each text box and make look good
	label: {
		display: 'block',
		marginBottom: '8px',
		fontWeight: 'bold',
	},

	// fix the textarea sizes and dont let the users change it
	textarea: {
		width: '80%', 
		height: '100px', 
		padding: '10px',
		borderRadius: '4px', 
		border: '1px solid #ccc', 
		fontSize: '16px', 
		resize: 'none',
	},

	// this is to put buttons in corners look nice
	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '10px',
	},
}

export const confirmPopupStyle = {
	// --- blur the background
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
	
	// --- design the modal for the popup
		modal: {
			backgroundColor: 'white',
			padding: '20px',
			borderRadius: '8px',
			maxWidth: '500px',
			width: '100%',
			textAlign: 'center',
		},
	
	// --- styles for the content inside of the modal
		
		label: {
			display: 'block',
			marginBottom: '8px',
			fontWeight: 'bold',
		},

		buttonContainer: {
			display: 'flex',
			justifyContent: 'flex-end',
			padding: '10px',
		},
	}
////////////////////////
// SHARED STYLES ONLY //
////////////////////////

export const pageStyle = {
	padding: '1vw',
}

export const tagStyles = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		maxHeight: 'calc(3 * (16px + 4px))',
		minHeight: 'calc(3 * (16px + 4px))',
		overflowY: 'auto',
		gap: '2px',
		alignContent: 'flex-start',
	},
	item: {
		backgroundColor: '#666666',
		padding: '3px 3px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
	},
	active_item: {
	},
}

export const textTagStyle = {
	fontSize: 'clamp(0.8rem, 4vw, 0.3rem)',
	lineHeight: '1.0',
	color: 'white',
	overflow: 'hidden',
}

export const defaultPopupStyle = {
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
		maxWidth: '500px',
		width: '100%',
		textAlign: 'center',
	},

	inputContainer: {
		marginBottom: '20px', 
	},
	
	label: {
		display: 'block',
		marginBottom: '8px',
		fontWeight: 'bold',
	},

	textarea: {
		width: '80%', 
		height: '100px', 
		padding: '10px',
		borderRadius: '4px', 
		border: '1px solid #ccc', 
		fontSize: '16px', 
		resize: 'none',
	},

	buttonContainer: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '10px',
	},
}

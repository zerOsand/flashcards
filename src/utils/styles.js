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
	},
	back: {
		background: '#f0f0f0',
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

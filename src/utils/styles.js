export const pageStyle = {
	padding: '1vw',
}

export const contentArea = {
	display: 'flex',
	flexDirection: 'column',
	margin: '20px',
	marginTop: '20px',
	borderStyle: 'solid',
	borderRadius: '1px',
	borderColor: '#333',
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
	borderColor: '#333',
};

export const container = {
	display: 'flex',
	flex: '1',
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
	backgroundColor: '#f8f8f8',
	justifyContent: 'center',
	alignItems: 'center',
	overflow: 'auto',
};

export const previewStyles = {
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	item: {
		flex: '0 0 calc(100% / 2 - 10px)', // items/spacing per row
		marginBottom: '15px',
		borderStyle: 'solid',
		borderRadius: '4px',
		borderWidth: 'thin',
		borderColor: '#000',
		background: '#e0e0e0',
		color: '#424242',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '75px',
		overflow: 'hidden',
		boxSizing: 'border-box',
	},
	active_item: {
		background: '#ef9a9a',
		color: '#000',
		borderWidth: 'medium',
	},
};

export const cardPaneStyle = {
	front: {
		borderStyle: 'solid',
		borderRadius: '6px',
		borderColor: '#000',
		borderWidth: 'medium',
		background: '#fff',
		color: '#000',
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

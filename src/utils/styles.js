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
	overflow: 'hidden'
};

export const contentContainer = {
	display: 'flex',
	flexDirection: 'column',
	height: 'calc(100vh - 60px)',
	padding: 0,
	overflow: 'hidden',
};

export const searchBarStyle = {
	display: 'flex',
	borderColor: '#333',
};

export const buttonStyle = {
	borderRadius: '0',
	borderColor: '#333',
	color: '#000',
	backgroundColor: '#33cc33',
	font: 'bold 10pt Arial, Helvetica, sans-serif',
};

export const cardPreviewStyle = {
	borderStyle: 'solid',
	borderRadius: '6px',
	borderColor: '#000',
	padding: '6vw',
	margin: '4vw',
	textAlign: 'center',
};

export const cardPaneStyle = {
	borderStyle: 'solid',
	borderRadius: '6px',
	borderColor: '#000',
	height: '60%',
	width: '80%',
	display: 'flex',
	textAlign: 'center',
	alignItems: 'center',
	justifyContent: 'center',
	overflowY: 'auto',
}

export const cardTextStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.5rem)',
	lineHeight: '1.2',
	margin: 'auto',
}

export const cardDimmedTextStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.5rem)',
	lineHeight: '1.2',
	color: 'lightgrey',
	margin: 'auto',
}

export const container = {
	display: 'flex',
	flex: '1',
	overflow: 'hidden',
};

export const leftContainer = {
	flex: '1',
	overflow: 'auto',
	padding: '10px',
};

export const rightContainer = {
	flex: '1',
	display: 'flex',
	backgroundColor: '#f8f8f8',
	justifyContent: 'center',
	alignItems: 'center',
};

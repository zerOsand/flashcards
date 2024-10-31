export const pageStyle = {
    padding: '1vw',
}

export const contentArea = {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px',
    borderStyle: 'solid',
    borderRadius: '1px',
    borderColor: '#333',
	// this number is not quite right (it always seems to be different depending on the size of my browser window
	// worse, it prevents the scrollbar from allowing scrolling all the way to the bottom
    // height: '89vh', 
    overflow: 'hidden'
}

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
    textAlign: 'center'
}

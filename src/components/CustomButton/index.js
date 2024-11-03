const defaultStyle = {
	backgroundColor: '#666666',
	color: 'white',
	padding: '10px 20px',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
	marginLeft: '10px',
}

const CustomButton = ({ text, event, stylesOverride }) => {
	return (
			<button onClick={event} style={{ ...defaultStyle, ...(stylesOverride ?? {}) }}>
				{text}
			</button>
	);
}

export default CustomButton

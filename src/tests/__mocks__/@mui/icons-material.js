const MockIcon = (name) => {
	<div data-testid={`${name.toLowerCase()}-mock`}
		 style={{ display: 'none' }} >
		{name}
	</div>
}

const icons = [
	'SearchIcon', 'OpenInFull', 'DeleteIcon', 'RotateLeftIcon',
	'EditIcon', 'CloseIcon', 'DownloadIcon', 'UploadIcon',
	'RotateLeft', 'ThumbUp', 'ThumbDown', 'Home', 'SearchIcon'
];

const mockIcons = {}
icons.forEach(icon => {
	mockExports[`${icon}`] = () =>
	MockIcon(icon);
});


export default mockIcons;

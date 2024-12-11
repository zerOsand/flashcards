import { Box, List, ListItem, ListItemText } from '@mui/material';

/**
 * Default styles.
 * These styles can be overridden by the `style` prop.
 */
const defaultStyle = {
	container: {
	},
	grid: {
	},
	item: (index, active) => ({
	}),
}

/**
 * `ClickList` is a React component that renders a clickable list with optional custom styles and an optional prepended item.
 * 
 * @param {number} active - The index of the active item, used to highlight it.
 * @param {Array} list - An array of items to display in the list.
 * @param {Function} [item] - Optional: A custom function to render list items.
 * @param {Function} event - A function to call when an item is clicked, receives the index of the clicked item.
 * @param {Object} [styles] - Optional: Custom styles to override the default styles.
 * @param {Function} [prependItem] - Optional: A function to prepend an object to the list.
 * 
 * @returns {JSX.Element} A `Box` component containing the list of clickable `ListItem` components.
 */
const ClickList = ({ active, list, item, event, styles, prependItem }) => {
	styles = styles || defaultStyle
	return (
		<Box sx={styles.container}>
			<List sx = {styles.grid}>
				{prependItem && prependItem()}
				{list.map((value, index) => {
					return (
						<ListItem key={index}
								sx={{ ...styles.item(index,active), cursor: 'pointer', }}
								onClick={(e) => {e.stopPropagation(); event(index);}}
								data-testid="cl-item"
						>
							{item ? item(value, active === index) : <ListItemText primary={value} />}
						</ListItem>
					)
				})}
			</List>
		</Box>
	);
}

export default ClickList

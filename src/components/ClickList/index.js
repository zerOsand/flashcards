import { Box, List, ListItem, ListItemText } from '@mui/material';

const defaultStyle = {
	container: {
	},
	grid: {
	},
	item: {
	},
}

const ClickList = ({ active, list, item, event, styles, prependItem }) => {
	styles = styles || defaultStyle
	return (
		<Box sx={styles.container}>
			{prependItem && prependItem()}
			<List sx = {styles.grid}>
				{list.map((value, index) => {
					return (
						<ListItem key={index}
								sx={styles.item(index,active)}
								onClick={(e) => {e.stopPropagation(); event(index);}}
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

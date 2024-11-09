const Box = (value) => {
	return <div>{value}</div>
}

const defaultStyle = {
	container: {
	},
	item: {
	},
	active_item:{
	}
}

const ClickList = ({ active, list, item, event, styles, appendItem }) => {
	styles = styles || defaultStyle
	return (
			<div style={styles.container}>
				{list.map((value, index) => {
					styles = JSON.parse(JSON.stringify(styles));
					styles.item.cursor = 'pointer'
					return (
							<div key={index} style={{ ...styles.item, ...(index === active ? styles.active_item : {}) }} onClick={(e) => {
								e.stopPropagation()
								event(index);
							}}>
								{item ? item(value, active === index) : Box(value)}
							</div>
					);
				})}
			{appendItem && appendItem()}
		</div>
	);
}

export default ClickList

// const Box = (value) => {
// 	return <div>{value}</div>
// }

// const defaultStyle = {
// 	container: {
// 	},
// 	item: {
// 	},
// 	active_item:{
// 	}
// }

// const ClickList = ({ active, list, item, event, styles, prependItem }) => {
// 	styles = styles || defaultStyle
// 	return (
// 			<div style={styles.container}>
// 				{prependItem && prependItem()}
// 				{list.map((value, index) => {
// 					styles = JSON.parse(JSON.stringify(styles));
// 					styles.item.cursor = 'pointer'
// 					return (
// 							<div key={index} style={{ ...styles.item, ...(index === active ? styles.active_item : {}) }} onClick={(e) => {
// 								e.stopPropagation()
// 								event(index);
// 							}}>
// 								{item ? item(value, active === index) : Box(value)}
// 							</div>
// 					);
// 				})}
// 		</div>
// 	);
// }

// export default ClickList

const Box = (value) => {
	return <div>{value}</div>;
  };
  
  const defaultStyle = {
	container: {},
	item: {},
	active_item: {},
  };
  
  const ClickList = ({ active, list, item, event, styles, prependItem }) => {
	styles = styles || defaultStyle;
  
	return (
	  <div style={styles.container}>
		{prependItem && prependItem()}
		{list
		  .slice() // Create a shallow copy of the list
		  .reverse() // Reverse the list to display new cards at the top
		  .map((value, reverseIndex) => {
			const index = list.length - 1 - reverseIndex; // Map reverseIndex back to the original index
			const updatedStyles = JSON.parse(JSON.stringify(styles));
			updatedStyles.item.cursor = 'pointer';
			return (
			  <div
				key={index}
				style={{
				  ...updatedStyles.item,
				  ...(index === active ? updatedStyles.active_item : {}),
				}}
				onClick={(e) => {
				  e.stopPropagation();
				  event(index); // Pass the correct index based on the original list
				}}
			  >
				{item ? item(value, active === index) : Box(value)}
			  </div>
			);
		  })}
	  </div>
	);
  };
  
  export default ClickList;
  
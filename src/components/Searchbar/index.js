import { useState, useEffect } from 'react'

const defaultStyle = {
	container: {
		flexGrow: 1,
	},
	input: {
		width: '100%',
		height: '85%',
	},
}

const Searchbar = ({ cards, onFilteredCardsChange, styles }) => {
	const [searchTerm, setSearchTerm] = useState([''])
	styles = styles || defaultStyle

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value.toLowerCase().split(","))
	}

	useEffect(() => {
		const sortedAndFilteredCards = cards
			  .filter(card =>
				  card.tags.some(tag =>
					  searchTerm.some(term =>
						  tag.toLowerCase().includes(term))))

		onFilteredCardsChange(sortedAndFilteredCards);
	}, [searchTerm, cards, onFilteredCardsChange]);

	return (
		<div style={styles.container}>
			<input style={styles.input}
				type="text"
				placeholder="tag1,tag2,tag3"
				value={searchTerm}
				onChange={handleSearchChange}
			/>
		</div>
	);
}


export default Searchbar

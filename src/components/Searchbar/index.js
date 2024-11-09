import { useState, useEffect, useMemo } from 'react'
import { useCards } from '../../state/CardProvider.js'

const defaultStyle = {
	container: {
		flexGrow: 1,
	},
	input: {
		width: '100%',
		height: '85%',
	},
}

const Searchbar = ({ onFilteredCardsChange, styles }) => {
	const { cards } = useCards();
	const [searchTerm, setSearchTerm] = useState([''])
	styles = styles || defaultStyle

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value.toLowerCase().split(","))
	}
	
	const sortedAndFilteredCards = useMemo(() => {
		return (searchTerm[0].length === 0) ?
			cards :
			cards.filter(card =>
				card.tags.some(tag =>
					searchTerm.some(term =>
						tag.toLowerCase().includes(term)))
			)
	}, [cards, searchTerm]);
	
	useEffect(() => {
		onFilteredCardsChange(sortedAndFilteredCards);
	}, [sortedAndFilteredCards, onFilteredCardsChange]);

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

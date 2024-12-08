import { TextField, InputAdornment } from "@mui/material";
import { useState, useEffect, useMemo } from 'react'
import { useCards } from '../../state/CardProvider.js'
import SearchIcon from '@mui/icons-material/Search';
import { tagsMatchExpression } from './TagMatchExpression'

const Searchbar = ({ onFilteredCardsChange }) => {
	const { cards } = useCards();
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value.toLowerCase())
	}
	
	const sortedAndFilteredCards = useMemo(() => {
		if (searchTerm.length === 0)
			return cards

		return cards.filter(card => tagsMatchExpression(searchTerm, card.tags))
	}, [cards, searchTerm]);

	useEffect(() => {
		onFilteredCardsChange(sortedAndFilteredCards);
	}, [sortedAndFilteredCards, onFilteredCardsChange]);

	return (
		<TextField
			placeholder="tag1 ^ (tag2 | !tag3) & tag4"
			value={searchTerm}
			onChange={handleSearchChange}
			variant="standard"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
			fullWidth
		/>
	);
}


export default Searchbar

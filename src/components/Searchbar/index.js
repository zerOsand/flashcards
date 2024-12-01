import { TextField, InputAdornment } from "@mui/material";
import { useState, useEffect, useMemo } from 'react'
import { useCards } from '../../state/CardProvider.js'
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({ onFilteredCardsChange }) => {
	const { cards } = useCards();
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value.toLowerCase())
	}
	
	const sortedAndFilteredCards = useMemo(() => {
		if (searchTerm.length === 0)
			return cards

		const or = searchTerm.split('||').map(t => t.trim())

		return cards.filter(card => or.some(g => {
			const and = g.split('&&').map(t => t.trim())
			return and.every(t => card.tags.some(tag =>
				tag.toLowerCase() === t))
		}))
	}, [cards, searchTerm]);

	useEffect(() => {
		onFilteredCardsChange(sortedAndFilteredCards);
	}, [sortedAndFilteredCards, onFilteredCardsChange]);

	return (
		<TextField
			placeholder="tag1 && tag2 || tag3"
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

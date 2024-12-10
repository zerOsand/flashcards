import { TextField, InputAdornment, Button, Tooltip, Box } from "@mui/material";
import { useState, useEffect, useMemo, createContext, } from 'react';
import { useCards } from '../../state/CardProvider.js';
import { useSearch } from './SearchContext.js';
import SearchIcon from '@mui/icons-material/Search';
import OpenInFull from '@mui/icons-material/OpenInFull';
import DefaultPopup from '../Popup';
import { tagsMatchExpression } from './TagMatchExpression';

/**
 * `Searchbar` is a component that provides a search input for filtering a list of cards based on tag expressions. 
 * It includes a collapsible feature to expand the input for more complex queries.
 * 
 * @param {function} onFilteredCardsChange - A callback to call when the filtered list of cards changes.
 * 
 * @returns {JSX.Element} A search bar with a standard input field and an expandable input modal.
 */
const Searchbar = ({ onFilteredCardsChange }) => {

	// Retrieve cards and search term from context
	const { cards } = useCards();
	const { searchTerm, setSearchTerm } = useSearch()
	const [expandOpen, setExpandOpen] = useState(false)

	// Handle the change in search input
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value)
	}

	// Memoize the filtered and sorted cards based on the search term
	const sortedAndFilteredCards = useMemo(() => {
		if (searchTerm.length === 0)
			return cards;

		return cards.filter(card => tagsMatchExpression(searchTerm.toLowerCase(), card.tags.map(tag => tag.toLowerCase())));
	}, [cards, searchTerm]);

	// Update the filtered cards when the filtered list changes
	useEffect(() => {
		onFilteredCardsChange(sortedAndFilteredCards);
	}, [sortedAndFilteredCards, onFilteredCardsChange]);

	// TextField properties for the search input
	const textFieldProps = {
		placeholder: "tag1 ^ (tag2 | !tag3) & tag4",
		value: searchTerm,
		onChange: handleSearchChange,
		variant: "standard",
		InputProps: {
            startAdornment: (
	            <InputAdornment position="start">
    	            <SearchIcon />
        	    </InputAdornment>
            ),
		},
		fullWidth: true,
	}

	/**
	 * Returns the JSX structure for the Searchbar component.
	 * 
	 * Renders:
	 * 1. A standard `TextField` for entering search queries.
	 * 2. A small `Button` inside a `Tooltip` that expands the input into a modal.
	 * 3. A `DefaultPopup` modal with a larger `TextField` for more complex search queries.
	 */
	return (
		<>
			<TextField  data-testid="default-search-input" {...textFieldProps} />

			<Tooltip title="Expand Input" arrow placement="top">
				<Button
					size="small"
					variant="standard"
					sx={{ padding: '1px 2px', fontSize: '0.50rem', minWidth: '20px' }}
					disableRipple
					onClick={() => setExpandOpen(true)}
				>
					<OpenInFull fontSize="small" sx={{
									color: 'black',
									transition: 'color 0.3s ease, color 0.3s ease',
					}} />
				</Button>
			</Tooltip>


			<DefaultPopup
				open={expandOpen}
				onClose={() => {setExpandOpen(false)}}
				style={{
					overlay: {
						position:'fixed',
						top:0,
						left:0,
						width:'100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'center',
						backdropFilter: 'blur(1px)',
					},
					modal: {
						width: '800px',
						backgroundColor: 'white',
						padding: '20px',
						borderRadius: '8px',
					}
				}}
			>
				<TextField data-testid="modal-search-input"
					{...textFieldProps}
					multiline
					rows={3}
				/>
			</DefaultPopup>
		</>


	);
}


export default Searchbar

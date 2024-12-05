import { TextField, InputAdornment, Button, Tooltip, Box } from "@mui/material";
import { useState, useEffect, useMemo } from 'react'
import { useCards } from '../../state/CardProvider.js'
import SearchIcon from '@mui/icons-material/Search';
import OpenInFull from '@mui/icons-material/OpenInFull';
import DefaultPopup from '../Popup'

const Searchbar = ({ onFilteredCardsChange }) => {
	const { cards } = useCards();
	const [searchTerm, setSearchTerm] = useState('')
	const [expandOpen, setExpandOpen] = useState(false)


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

	const textFieldProps = {
		placeholder: "tag1 && tag2 || tag3",
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

	return (
		<>
			<TextField {...textFieldProps} />

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
				<TextField
					{...textFieldProps}
					multiline
					rows={3}
				/>
			</DefaultPopup>
		</>
	);
}


export default Searchbar

import ClickList from '../../components/ClickList';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, InputAdornment, Typography, ListItem, Button } from "@mui/material";
import { useCards } from '../../state/CardProvider.js';
import { useState, useEffect, useMemo } from 'react';
import { useTheme } from "@mui/material/styles";

/**
 * `Selector` is a React component for managing and filtering tags with add/remove functionality.
 * 
 * @param {Function} onAdd - Callback for adding a new tag.
 * @param {Function} onRemove - Callback for removing a tag or tags.
 * @param {Array} utags - List of unfiltered tags.
 * 
 * @returns {JSX.Element} A tag management UI with input, filtering, and clickable lists.
 */
const Selector = ({onAdd, onRemove, utags}) => {
	const theme = useTheme();

	const tags = useMemo(() => utags.filter(tag => tag !== 'learning'), [utags])
	const { getTags } = useCards();
 	const [inputValue, setInputValue] = useState('')
	const [matchedTags, setMatchedTags] = useState([])

	/**
	 * Filters tags based on user input and updates the matched tags list.
	 * 
	 * - Retrieves missing tags not already in the `tags` list.
	 * - Matches missing tags against the `inputValue` (case-insensitive).
	 * - Updates the `matchedTags` state with the matched tags.
	 * 
	 * @param {string} inputValue - The current input value used for filtering tags.
	 * @param {Array} tags - The current list of selected tags.
	 */
	useEffect(() => {
		const getMissingTags = () => {
			return getTags().filter((tag) =>
				!tags.includes(tag))
		}
		const matchTags = () => {
			const match = getMissingTags().filter((tag) =>
				tag.toLowerCase().includes(inputValue.toLowerCase())
			);
			setMatchedTags(match)
		}
		matchTags()
	}, [inputValue, tags]);

	/**
	 * Handles user input changes; updates input state after sanitizing.
	 * 
	 * @param {Object} event - The input change event.
	 */
	const handleInputChange = (event) => {
		setInputValue(event.target.value.replace(/[^a-zA-Z0-9-]/g, ''))
	}

	/**
	 * Adds a matched tag to the current tags list.
	 * 
	 * @param {number} index - Index of the matched tag to add.
	 */
	const handleAdd = (index) => {
		onAdd(matchedTags[index])
	}

	/**
	 * Removes a tag from the current tags list.
	 * 
	 * @param {number} index - Index of the tag to remove.
	 */
	const handleRemove = (index) => {
		onRemove([tags[index]])
	}

	/**
	 * Clears all current tags.
	 */
	const handleClear = () => {
		onRemove(tags)
	}

	/**
	 * Generates styles for tag items in the list.
	 * 
	 * @param {string} color - Text color for the tag item.
	 * @returns {Object} Style object for the tag item.
	 */
	const ListTagSx = (color) => ({
		fontFamily: theme.typography.fontFamily,
		fontSize: '0.750rem',
		fontWeight: 400,
		width: '100%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		userSelect: 'none',
		whiteSpace: 'nowrap',
		color: color,
	})

	/**
	 * Renders a filtered tag with primary text color.
	 * 
	 * @param {string} text - The text of the tag.
	 * @returns {JSX.Element} Styled Typography component.
	 */
	const FilteredTags = (text) => {
		return (
				<Typography sx={ListTagSx(theme.palette.text.primary)} >
					{text}
				</Typography>
		);
	}

	/**
	 * Renders a current tag with primary main color.
	 * 
	 * @param {string} text - The text of the tag.
	 * @returns {JSX.Element} Styled Typography component.
	 */
	const CurrentTags = (text) => {
		return (
				<Typography sx={ListTagSx(theme.palette.primary.main)} >
					{text}
				</Typography>
		);
	}

	/**
	 * Adds a new tag if it is valid and not already in the current tags.
	 * 
	 * @returns {JSX.Element} A `ListItem` component for adding a new tag.
	 */
	const AddNew = () => {
		const valid = !tags.includes(inputValue) && inputValue !== 'learning'
		return (
			<ListItem
				onClick={(e) => {
					if (valid) {
						e.stopPropagation()
						onAdd(inputValue)
						setInputValue('')
					}
				}}
				sx={{
					...selectorList.item(undefined, true),
					...((!valid) && {
						cursor: 'not-allowed',
						opacity: 0.5,
						"&:hover": {
							pointerEvents: 'none',
						},
					}),
				}}
				data-testid="create-tag"
				>
				{FilteredTags('+ '.concat(inputValue))}
			</ListItem>
		)
	}

	/**
	 * Contains styles for the selector list and items.
	 * 
	 * @returns {Object} Style definitions for list and grid elements.
	 */
	const selectorList = {
		container: {
			overflowY: 'auto',
		},
		grid: {
			display: 'grid',
			gridTemplateColumns: 'repeat(1, 1fr)',
			margin: '4px',
		},
		item: (index, active) => ({
			marginBottom: '4px',
			borderRadius: '4px',
			textAlign: 'center',
			backgroundColor: theme.palette.background.paper,
			height: '25px',
			overflow: 'hidden',
			boxSizing: 'border-box',
			boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
			transition: "all 0.3s ease",
			"&:hover": {
				backgroundColor: theme.palette.background.default,
			},
		}),
	}

	return (
			<Box sx={{  padding: '4px',
						display: 'flex',
						flexDirection: 'column',
						height: '100%' }}>
					<Box sx={{ display: 'flex'}}>
					<TextField
						placeholder='new-tag'
						value={inputValue}
						onChange={handleInputChange}
						variant='standard'
						fullWidth={false}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
									</InputAdornment>
							),
						}}
						sx={{
							marginLeft: '0',
							marginBottom: '2px',
							width: '50%',
						}}
					/>
			<Box sx={{ width: '50%', }} >
						<Button
							size="small"
							variant="standard"
							sx={{ fontSize: '0.65rem', width: '90%', color: '#800000', "&:hover": { textDecoration: 'underline'} }}
							disableRipple
							onClick={() => handleClear()}
							>
							Clear
						</Button>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', overflowY: 'auto' }} >
					<Box sx={{ overflowY: 'auto', height: '98%', width:'50%', }}>
						<ClickList
							styles={selectorList}
							list={matchedTags}
							item={FilteredTags}
							event={handleAdd}
							prependItem={(inputValue !== '' && !matchedTags.includes(inputValue))
								? AddNew : undefined} />
					</Box>
					<Box sx={{ overflowY: 'auto', height: '98%', width:'50%', }}>
						<ClickList
							styles={{ ...selectorList,
									  item: (index, active) => ({ ...selectorList.item(index, active),
																 border: `2px solid ${
																			theme.palette.accent.border
																 }`,
																 backgroundColor: theme.palette.background.accent})}}
							list={tags}
							item={CurrentTags}
							event={handleRemove} />
					</Box>
				</Box>
			</Box>
	);
}


export default Selector

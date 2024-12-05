import ClickList from '../../components/ClickList'
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, InputAdornment, Typography, ListItem, Button } from "@mui/material";
import { useCards } from '../../state/CardProvider.js'
import { useState, useEffect } from 'react'
import { useTheme } from "@mui/material/styles";


const Selector = ({onAdd, onRemove, tags}) => {
	const theme = useTheme();

	const { getTags } = useCards();
 	const [inputValue, setInputValue] = useState('')
	const [matchedTags, setMatchedTags] = useState([])

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

	const handleInputChange = (event) => {
		setInputValue(event.target.value)
	}

	const handleAdd = (index) => {
		onAdd(matchedTags[index])
	}

	const handleRemove = (index) => {
		onRemove([tags[index]])
	}

	const handleClear = () => {
		onRemove(tags)
	}

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

	const FilteredTags = (text) => {
		return (
				<Typography sx={ListTagSx(theme.palette.text.primary)} >
					{text}
				</Typography>
		);
	}

	const CurrentTags = (text) => {
		return (
				<Typography sx={ListTagSx(theme.palette.primary.main)} >
					{text}
				</Typography>
		);
	}

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

	const AddNew = () => {
		const valid = !tags.includes(inputValue) && inputValue !== '!learning'
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
				>
				{FilteredTags('+ '.concat(inputValue))}
			</ListItem>
		)
	}

	return (
			<Box sx={{  padding: '4px',
						display: 'flex',
						flexDirection: 'column',
						height: '100%' }}>
					<Box sx={{ display: 'flex'}}>
					<TextField
						placeholder='Filter...'
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

import ClickList from '../../components/ClickList'
import SearchIcon from '@mui/icons-material/Search';
import { tagStyles, textTagStyle } from '../../utils/styles'
import { Box, TextField, InputAdornment, Typography, ListItem } from "@mui/material";
import { useCards } from '../../state/CardProvider.js'
import { useState, useEffect } from 'react'
import { useTheme } from "@mui/material/styles";


const Selector = ({onAdd, onRemove, tags}) => {
	const theme = useTheme();

	const { getTags } = useCards();
 	const [inputValue, setInputValue] = useState('')
	const getMissingTags = () => {
		return getTags().filter((tag) =>
			!tags.includes(tag))
	}
	const [matchedTags, setMatchedTags] = useState(getMissingTags())

	useEffect(() => {
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
		onRemove(tags[index])
	}

	const ListTagSx = (color) => ({
		fontFamily: theme.typography.fontFamily,
		fontSize: theme.typography.body1.fontSize,
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
			height: '100%',
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
		return (
			<ListItem
				onClick={(e) => {
					e.stopPropagation()
					onAdd(inputValue)
					setInputValue('')}
				}
			sx={{ ...selectorList.item(undefined, true), cursor: 'pointer', }}
			>
				{FilteredTags('+ '.concat(inputValue))}
			</ListItem>
		)
	}

	return (
			<Box sx={{ padding: 2 }}>
				<Box sx={{ display: 'flex' }}>
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
					<Box sx={{ width: '50%', minHeight: '1px' }} />
				</Box>
				<Box sx={{ display: 'flex', height: '300px', gap: 2 }}>
					<Box sx={{ flex: 1 }}>
						<ClickList
							styles={selectorList}
							list={matchedTags}
							item={FilteredTags}
							event={handleAdd}
							prependItem={(inputValue !== '' && matchedTags.length === 0)
								? AddNew : undefined} />
					</Box>
					<Box sx={{ flex: 1 }}>
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


const styles  = {
	body: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridGap: '10px',
		alignItems: 'end',
	},
	lg: {
		gridRow: 1,
		gridColumn: 1,
	},
	rg: {
		gridRow: 1,
		gridColumn: 2,
		overflowY: 'auto'
	},
}

export default Selector


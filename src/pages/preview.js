import { Box, Typography, Button } from "@mui/material";
import ClickList from '../components/ClickList'
import ConfirmationPopup from './confirmPopup.js'
import EditCard from './editCard.js'
import { useCards } from '../state/CardProvider.js'
import { useState, useEffect } from 'react'
import { useTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';


const PreviewPane = ({ index })  => {
	const theme = useTheme();
	const {activeIndex, setActiveIndex} = index
	const { cards, removeTag, removeCard } = useCards();
	const [flipped, setFlipped] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [removeOpen, setRemoveOpen] = useState(false)

	const handleTagClick = (tagIndex) => {
		removeTag(activeIndex, tagIndex)
	};

	useEffect(() => {
        setFlipped(false);
    }, [activeIndex]);

	const handleRemoveConfirm = () => {
		removeCard(activeIndex);
		if (activeIndex >= cards.length - 1)
			setActiveIndex(undefined);
		setRemoveOpen(false)
	}

	const TagBox = (text) => {
		return (
				<Box sx = {{ display: 'flex', alignItems: 'center' }}>
					<Typography
						sx={{
						fontFamily: theme.typography.fontFamily,
						fontSize: theme.typography.body1.fontSize,
						fontWeight: 400,
						whiteSpace: 'nowrap',
						color: theme.palette.text.primary,
					}}
				>
					{text}
				</Typography>
				<CloseIcon sx={{ marginLeft: 1,
								cursor: 'pointer',
								fontSize: 'small',
								color: theme.palette.primary.light, }} />
			</Box>
		)
	};

	const tagList = {
		container: {
			width: '100%',
			overflowY: 'auto',
			height: '110px'
		},
		grid: {
			display: 'flex',
			flexWrap: 'wrap',
			gap: '4px',
			margin: '4px',
		},
		item: (index, active) => ({
			backgroundColor: theme.palette.accent.light,
			padding: '2px 10px',
			borderRadius: '4px',
			flexShrink: 0,
			width: 'fit-content',
			"&:hover": {
				backgroundColor: theme.palette.background.default,
			},
		}),
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '90%',
					height: '80%',
					cursor: 'default',
					borderRadius: '20px',
					border: `2px solid ${
						theme.palette.secondary.main
					}`,
					backgroundColor: theme.palette.background.paper, 
					boxSizing: 'border-box',
					padding: '20px',
				}}
			>
				<Box sx={{
						display: 'flex',
						justifyContent: 'center',
						borderRadius: '4px',
						backgroundColor: theme.palette.background.default,
						overflowY: 'auto',
						marginBottom: '40px',
						alignItems: 'flex-start',
						height: '100%',
					}}>
					<Box sx={{
							display: 'flex',
							flexGrow: 1,
							flexDirection: 'column',
							justifyContent: 'center',
							textAlign: 'center',
							alignItems: 'center',
							wordWrap: 'anywhere',
							overflowWrap: 'anywhere',
							hyphens: 'auto',
							userSelect: 'none',
							margin: 'auto',
					}}>
						{activeIndex !== undefined && (
							<Typography variant="body4" sx={{ marginBottom: '15px', }}>
								{flipped ? "Back Side" : "Front Side"}
							</Typography>
						)}
							<Typography variant="h1" sx={{
								whiteSpace: 'pre-wrap',
							}}>
								{activeIndex === undefined
							 	? "Select a card for preview."
							 	: (flipped ? cards[activeIndex].back : cards[activeIndex].front)}
							</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						height: '140px',
					}}>
				<Typography variant="h3">
					Tags
				</Typography>
				{activeIndex !== undefined && <ClickList
					list={cards[activeIndex].tags}
					item={TagBox}
					event={handleTagClick}
					styles={tagList}
				 />}
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: 2,
					width: '90%',
				}}>
				<Button
					variant="contained"
					startIcon={<RotateLeftIcon />}
					disableRipple
					sx={{ flex: '1 1 80%', marginRight: 2, }}
					onClick={() => setFlipped(!flipped)}
					disabled={activeIndex === undefined}
				>
					Flip
				</Button>
				<Button
					variant="outlined"
					disableRipple
					sx={{ flex: '1 1 10%', marginRight: 2, }}
					onClick={() => setEditOpen(true)}
					disabled={activeIndex === undefined}
				>
					<EditIcon />
				</Button>
				<Button
					variant="outlined"
					disableRipple
					sx={{ flex: '1 1 10%', }}
					onClick={() => setRemoveOpen(true)}
					disabled={activeIndex === undefined}
				>
					<DeleteIcon />
				</Button>
				<ConfirmationPopup
					open={removeOpen}
					onCancel={() => setRemoveOpen(false)}
					onConfirm={() => handleRemoveConfirm()}
					message={`Delete
							${cards[activeIndex]?.front}?`}/>

			</Box>
		</>
	)
}


export default PreviewPane

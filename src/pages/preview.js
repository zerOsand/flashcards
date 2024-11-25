import { useState, useEffect } from 'react'
import { tagStyles, textTagStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'
import ClickList from '../components/ClickList'
import EditCard from './editCard.js'
import ConfirmationPopup from './confirmPopup.js'
import { FaEdit, FaTrash } from 'react-icons/fa';


const PreviewPane = ({ index })  => {
	const {activeIndex, setActiveIndex} = index
	const { cards, removeTag, removeCard } = useCards();
	const [flipped, setFlipped] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isRemoveOpen, setIsRemoveOpen] = useState(false)

	const handleTagClick = (tagIndex) => {
		removeTag(activeIndex, tagIndex)
	};

	useEffect(() => {
        setFlipped(false);
    }, [activeIndex]);


	const toggleEditPopup = () => setIsEditOpen(!isEditOpen);

	const toggleRemovePopup = () => setIsRemoveOpen(!isRemoveOpen);

	const handleRemoveCard = () => {
		removeCard(activeIndex);
		if (activeIndex >= cards.length - 1)
			setActiveIndex(undefined);
	}

	const TagBox = (text) => {
		return (
				<div style={textTagStyle}>
					{text}
					<span>&times;</span>
				</div>
		);
	}

	return (
			<>
				<div style={cardPaneStyle.container} >
					<div style={{ ...cardPaneStyle.front, ...((flipped && activeIndex !== undefined) ? cardPaneStyle.back : {}) }} onClick={(e) => {
						e.stopPropagation()
						setFlipped(!flipped)
					}}>
						{(activeIndex === undefined) ?
						 <div style={{ ...textPreviewStyle, ...{color: 'lightgrey'}}}>
								Select a card for preview...
						 </div> : <div style={textPreviewStyle}>
							 {flipped ? cards[activeIndex].back : cards[activeIndex].front}
						</div>}
						{activeIndex !== undefined &&
		 					<>
								<button style={cardPaneStyle.editIconStyle} 
									onClick={(e) => {
										e.stopPropagation();
										toggleEditPopup()
									}}>
									<FaEdit size={25} color="#555" />
								</button>
								<button style={cardPaneStyle.trashIconStyle} 
									onClick={(e) => {
										e.stopPropagation();
										toggleRemovePopup()
									}}>
									<FaTrash size={25} color="#555" />
								</button>
							</>
						}
					</div>
					{activeIndex !== undefined && <ClickList list={cards[activeIndex].tags} item={TagBox} event={ handleTagClick } styles={{ ...tagStyles, item: { ...tagStyles.item, ...{backgroundColor: '#b53550'}}}} />}
				</div>
				{isEditOpen && (
					<EditCard
						togglePopup={toggleEditPopup}
						card={cards[activeIndex]}
					/>
				)}

				{isRemoveOpen && (
					<ConfirmationPopup
						onConfirm={handleRemoveCard}
						onClose={toggleRemovePopup}
						message="Are you sure you want to remove this flashcard?"
					/>
				)}
			</>
	)
}


const cardPaneStyle = {
	container: {
		height: '90%',
		width: '80%',		
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
		cursor: 'default',
		position: 'relative',
	},
	front: {
		display: 'flex',
		flexDirection: 'column',
		height: '80%',
		width: '100%',		
		borderStyle: 'solid',
		borderRadius: '6px',
		background: '#fff',
		textAlign: 'center',
		marginBottom: '4px',
		alignItems: 'center',
		cursor: 'pointer',
		overflowY: 'auto',
		overflowX: 'hidden',
		wordWrap: 'anywhere',
		overflowWrap: 'anywhere',
		hyphens: 'auto',
		userSelect: 'none',
		position: 'relative',
	},
	back: {
		background: '#f0f0f0',
		userSelect: 'none'
	},
	bar: {
		position: 'absolute',
		top: '95%',
		left: '85%',
	},

	editIconStyle: {
		position: 'absolute',
		bottom: '10px',
		right: '10px',
		border: 'none',
		backgroundColor: 'transparent',
	},

	trashIconStyle: {
		position: 'absolute',
		bottom: '10px',
		right: '50px',
		border: 'none',
		backgroundColor: 'transparent',
	}
};

const textPreviewStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.5rem)',
	lineHeight: '1.2',
	margin: 'auto',
	whiteSpace: 'pre-wrap',
}


export default PreviewPane

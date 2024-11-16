import { useState, useEffect } from 'react'
import { tagStyles, textTagStyle } from '../utils/styles'
import { useCards } from '../state/CardProvider.js'
import ClickList from '../components/ClickList'
import TagSelector from './tagSelector.js'


const PreviewPane = ({activeIndex}) => {
	const { cards, removeTag } = useCards();
	const [flipped, setFlipped] = useState(false)
	const [isPopupOpen, setIsPopupOpen] = useState(false)

	const handleTagClick = (tagIndex) => {
		removeTag(activeIndex, tagIndex)
	};

	useEffect(() => {
        setFlipped(false);
    }, [activeIndex]);

	const togglePopup = () => setIsPopupOpen(!isPopupOpen);

	const TagBox = (text) => {
		return (
				<div style={textTagStyle}>
					{text}
					<span>&times;</span>
				</div>
		);
	}

	const AddTag = () => {
		return (
				<div style={{ ...tagStyles.item, ...{backgroundColor: '#6bc879'}}} onClick={togglePopup}>
					<div style={textTagStyle}>
					{'+'}
					</div>
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
					</div>
					{activeIndex !== undefined && <ClickList list={cards[activeIndex].tags} item={TagBox} event={ handleTagClick} styles={{ ...tagStyles, item: { ...tagStyles.item, ...{backgroundColor: '#b53550'}}}} prependItem={AddTag} />}
				</div>
				{isPopupOpen && (
					<TagSelector
						isPopupOpen={isPopupOpen}
						togglePopup={togglePopup}
						index={activeIndex}
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
	},
	front: {
		display: 'flex',
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
	},
	back: {
		background: '#f0f0f0',
	}
};

const textPreviewStyle = {
	fontSize: 'clamp(1rem, 5vw, 1.5rem)',
	lineHeight: '1.2',
	margin: 'auto',
	whiteSpace: 'pre-wrap',
}


export default PreviewPane

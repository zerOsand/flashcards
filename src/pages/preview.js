import { useState, useEffect } from 'react'
import { cardPaneStyle, tagStyles, textPreviewStyle, textTagStyle } from '../utils/styles'
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
				{activeIndex !== undefined && <ClickList list={cards[activeIndex].tags} item={TagBox} event={ handleTagClick} styles={tagStyles} appendItem={AddTag} />}
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


export default PreviewPane
